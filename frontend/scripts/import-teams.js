const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Read the teams data from the Next.js app
const teamsPath = path.join(__dirname, '../app/data/teams.ts');
const teamsContent = fs.readFileSync(teamsPath, 'utf8');

// Extract teams array from the TypeScript file
// This is a simple regex-based extraction - in a real scenario, you might want to use a proper TypeScript parser
const teamsMatch = teamsContent.match(
  /export const teams: Team\[\] = (\[[\s\S]*?\]);/
);
if (!teamsMatch) {
  console.error('Could not extract teams data from teams.ts');
  process.exit(1);
}

// Convert TypeScript array to JavaScript (simple string replacement)
const teamsArrayString = teamsMatch[1]
  .replace(/'/g, '"') // Replace single quotes with double quotes
  .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

let teams;
try {
  teams = JSON.parse(teamsArrayString);
} catch (error) {
  console.error('Could not parse teams data:', error.message);
  console.log('Teams array string:', teamsArrayString);
  process.exit(1);
}

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Import function
async function importTeams() {
  console.log(`Starting import of ${teams.length} teams to ${STRAPI_URL}...`);

  const headers = {
    'Content-Type': 'application/json',
  };

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const team of teams) {
    try {
      const response = await axios.post(
        `${STRAPI_URL}/api/teams`,
        {
          data: {
            name: team.name,
            code: team.code,
            topic: team.topic,
            score: team.score,
            members: team.members,
          },
        },
        { headers }
      );

      console.log(
        `✅ Imported team: ${team.name} (ID: ${response.data.data.id})`
      );
      successCount++;
    } catch (error) {
      console.error(
        `❌ Failed to import team ${team.name}:`,
        error.response?.data?.error?.message || error.message
      );
      errorCount++;
    }

    // Small delay to avoid overwhelming the API
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('\n📊 Import Summary:');
  console.log(`✅ Successfully imported: ${successCount} teams`);
  console.log(`❌ Failed to import: ${errorCount} teams`);
  console.log(`📝 Total teams: ${teams.length}`);

  if (successCount > 0) {
    console.log(
      `\n🎉 Import completed! You can now view your teams at: ${STRAPI_URL}/admin/content-manager/collection-types/api::team.team`
    );
  }
}

// Check if Strapi is running
async function checkStrapiConnection() {
  try {
    await axios.get(`${STRAPI_URL}/api/teams`);
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔍 Checking Strapi connection...');

  const isConnected = await checkStrapiConnection();
  if (!isConnected) {
    console.error(`❌ Could not connect to Strapi at ${STRAPI_URL}`);
    console.log('Please make sure:');
    console.log('1. Strapi is running (npm run develop)');
    console.log('2. The URL is correct');
    console.log('3. API permissions are configured for the Team content type');
    process.exit(1);
  }

  console.log('✅ Strapi connection successful');

  await importTeams();
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
CSC302 Scoreboard - Team Data Import Script

Usage: node scripts/import-teams.js

Environment Variables:
  STRAPI_URL        Strapi server URL (default: http://localhost:1337)
  STRAPI_API_TOKEN  API token for authentication (optional)

Examples:
  node scripts/import-teams.js
  STRAPI_URL=http://localhost:1337 node scripts/import-teams.js
  STRAPI_API_TOKEN=your_token node scripts/import-teams.js

Make sure Strapi is running and the Team content type is configured before running this script.
  `);
  process.exit(0);
}

main().catch((error) => {
  console.error('💥 Unexpected error:', error.message);
  process.exit(1);
});
