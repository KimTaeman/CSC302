const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Read the teams data from the Next.js app
const teamsPath = path.join(__dirname, '../app/data/teams.ts');
const teamsContent = fs.readFileSync(teamsPath, 'utf8');

// Extract teams array from the TypeScript file
const teamsMatch = teamsContent.match(
  /export const teams: Team\[\] = (\[[\s\S]*?\]);/
);
if (!teamsMatch) {
  console.error('Could not extract teams data from teams.ts');
  process.exit(1);
}

// Convert TypeScript array to JavaScript (more robust parsing)
let teamsArrayString = teamsMatch[1];

// Remove comments
teamsArrayString = teamsArrayString.replace(/\/\/.*$/gm, '');

// Replace single quotes with double quotes, but be careful with quotes inside strings
teamsArrayString = teamsArrayString.replace(/'/g, '"');

// Remove trailing commas
teamsArrayString = teamsArrayString.replace(/,(\s*[}\]])/g, '$1');

// Add quotes around property names that aren't quoted
teamsArrayString = teamsArrayString.replace(/(\w+)(\s*:)/g, '"$1"$2');

let teams;
try {
  teams = JSON.parse(teamsArrayString);
} catch (error) {
  console.error('Could not parse teams data:', error.message);
  console.log('Teams array string:', teamsArrayString);

  // Try a different approach - use eval in a safer way
  try {
    console.log('Trying alternative parsing method...');
    const teamsContent = fs.readFileSync(teamsPath, 'utf8');

    // Extract just the teams array and create a valid JS expression
    const teamsMatch = teamsContent.match(
      /export const teams: Team\[\] = (\[[\s\S]*?\]);/
    );
    if (teamsMatch) {
      // Use Function constructor to safely evaluate the array
      const teamsArrayCode = teamsMatch[1];
      const evalFunction = new Function('return ' + teamsArrayCode);
      teams = evalFunction();
      console.log(
        '✅ Successfully parsed teams data using Function constructor'
      );
    } else {
      throw new Error('Could not extract teams array');
    }
  } catch (evalError) {
    console.error('Alternative parsing also failed:', evalError.message);
    process.exit(1);
  }
}

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
};

if (API_TOKEN) {
  headers.Authorization = `Bearer ${API_TOKEN}`;
}

// Helper function to create a student
async function createStudent(student) {
  try {
    const response = await axios.post(
      `${STRAPI_URL}/api/students`,
      {
        data: {
          name: student.name,
          studentId: student.studentId,
        },
      },
      { headers }
    );
    return response.data.data.id;
  } catch (error) {
    console.error(
      `❌ Failed to create student ${student.name}:`,
      error.response?.data?.error?.message || error.message
    );
    return null;
  }
}

// Helper function to create a team with student relationships
async function createTeam(team, studentIds) {
  try {
    const response = await axios.post(
      `${STRAPI_URL}/api/teams`,
      {
        data: {
          name: team.name,
          code: team.code,
          topic: team.topic,
          score: team.score,
          students: studentIds.filter((id) => id !== null), // Filter out failed student creations
        },
      },
      { headers }
    );
    return response.data.data.id;
  } catch (error) {
    console.error(
      `❌ Failed to create team ${team.name}:`,
      error.response?.data?.error?.message || error.message
    );
    return null;
  }
}

// Import function
async function importData() {
  console.log(
    `Starting import of ${teams.length} teams with students to ${STRAPI_URL}...`
  );

  let successCount = 0;
  let errorCount = 0;
  let studentsCreated = 0;

  for (const team of teams) {
    console.log(`\n📝 Processing team: ${team.name}`);

    // Create students first
    const studentIds = [];
    for (const student of team.students) {
      console.log(`  Creating student: ${student.name}`);
      const studentId = await createStudent(student);
      if (studentId) {
        studentIds.push(studentId);
        studentsCreated++;
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Create team with student relationships
    console.log(`  Creating team with ${studentIds.length} students`);
    const teamId = await createTeam(team, studentIds);

    if (teamId) {
      console.log(`✅ Created team: ${team.name} (ID: ${teamId})`);
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay between teams
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log('\n📊 Import Summary:');
  console.log(`✅ Successfully imported: ${successCount} teams`);
  console.log(`👥 Students created: ${studentsCreated}`);
  console.log(`❌ Failed to import: ${errorCount} teams`);
  console.log(`📝 Total teams: ${teams.length}`);

  if (successCount > 0) {
    console.log(`\n🎉 Import completed! You can now view your data at:`);
    console.log(
      `Teams: ${STRAPI_URL}/admin/content-manager/collection-types/api::team.team`
    );
    console.log(
      `Students: ${STRAPI_URL}/admin/content-manager/collection-types/api::student.student`
    );
  }
}

// Check if Strapi is running
async function checkStrapiConnection() {
  try {
    await axios.get(`${STRAPI_URL}/api/teams`);
    await axios.get(`${STRAPI_URL}/api/students`);
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
    console.log(
      '3. API permissions are configured for Team and Student content types'
    );
    console.log('4. Both Team and Student content types exist');
    process.exit(1);
  }

  console.log('✅ Strapi connection successful');

  await importData();
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
CSC302 Scoreboard - Complete Data Import Script

This script imports both students and teams with their relationships.

Usage: node scripts/import-data.js

Environment Variables:
  STRAPI_URL        Strapi server URL (default: http://localhost:1337)
  STRAPI_API_TOKEN  API token for authentication (optional)

Examples:
  node scripts/import-data.js
  STRAPI_URL=http://localhost:1337 node scripts/import-data.js
  STRAPI_API_TOKEN=your_token node scripts/import-data.js

Make sure Strapi is running and both Team and Student content types are configured before running this script.
  `);
  process.exit(0);
}

main().catch((error) => {
  console.error('💥 Unexpected error:', error.message);
  process.exit(1);
});
