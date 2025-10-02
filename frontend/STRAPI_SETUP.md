# Strapi Setup Guide for CSC302 Scoreboard

This guide will help you set up Strapi as the backend for your scoreboard application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Your Next.js scoreboard application

## Step 1: Create a New Strapi Project

```bash
# Create a new Strapi project
npx create-strapi-app@latest csc302-scoreboard-backend --quickstart

# Navigate to the project directory
cd csc302-scoreboard-backend
```

## Step 2: Create the Team Content Type

1. Start your Strapi development server:

   ```bash
   npm run develop
   ```

2. Open your browser and go to `http://localhost:1337/admin`

3. Create an admin account when prompted

4. In the admin panel, go to **Content-Types Builder**

5. Click **"Create new collection type"**

6. Name it `team` (Strapi will pluralize it to `teams`)

7. Add the following fields:

   | Field Name | Field Type       | Settings             |
   | ---------- | ---------------- | -------------------- |
   | `name`     | Text             | Required             |
   | `code`     | Text             | Required, Unique     |
   | `topic`    | Long text        | Required             |
   | `score`    | Number (integer) | Required, Default: 0 |
   | `members`  | JSON             | Required             |

8. Click **Save** and restart Strapi when prompted

## Step 3: Configure API Permissions

1. Go to **Settings** > **Users & Permissions Plugin** > **Roles**

2. Click on **Public** role

3. Under **Permissions**, expand **Team**

4. Check the following permissions:

   - `find` (to get all teams)
   - `findOne` (to get a single team)
   - `create` (to create new teams)
   - `update` (to update teams)
   - `delete` (to delete teams)

5. Click **Save**

## Step 4: Create API Token (Optional, for secured access)

1. Go to **Settings** > **API Tokens**

2. Click **Create new API Token**

3. Fill in:

   - **Name**: `Scoreboard App`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`

4. Click **Save** and copy the generated token

5. In your Next.js project, update `.env.local`:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_generated_token_here
   ```

## Step 5: Import Existing Team Data

You can import your existing team data in several ways:

### Option A: Manual Entry

1. Go to **Content Manager** > **Team**
2. Click **Create new entry**
3. Fill in the team data manually

### Option B: Import Script

Create a script to import your existing data:

```javascript
// import-teams.js
const axios = require('axios');
const teams = require('./app/data/teams').teams;

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your_api_token_here'; // If using tokens

async function importTeams() {
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
        {
          headers: {
            'Content-Type': 'application/json',
            ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
          },
        }
      );
      console.log(`Imported team: ${team.name}`);
    } catch (error) {
      console.error(
        `Failed to import team ${team.name}:`,
        error.response?.data || error.message
      );
    }
  }
}

importTeams();
```

Run the script:

```bash
node import-teams.js
```

## Step 6: Environment Configuration

Create or update your `.env.local` file in your Next.js project:

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

## Step 7: Test the Connection

1. Start your Strapi server: `npm run develop` (in the Strapi project)
2. Start your Next.js app: `npm run dev` (in your scoreboard project)
3. Visit your scoreboard application
4. You should see your teams loaded from Strapi

## Troubleshooting

### Common Issues:

1. **CORS Error**:

   - Make sure your Next.js app is running on `http://localhost:3000`
   - Check Strapi's CORS settings in `config/middlewares.js`

2. **API Token Issues**:

   - Verify the token is correctly set in `.env.local`
   - Make sure the token has the right permissions

3. **Connection Refused**:

   - Ensure Strapi is running on port 1337
   - Check if the `NEXT_PUBLIC_STRAPI_URL` is correct

4. **Data Not Loading**:
   - Check browser console for errors
   - Verify API permissions are set correctly
   - Test API endpoints directly: `http://localhost:1337/api/teams`

## Production Deployment

For production deployment:

1. Deploy Strapi to a cloud service (Heroku, Railway, DigitalOcean, etc.)
2. Update `NEXT_PUBLIC_STRAPI_URL` to your production Strapi URL
3. Use environment variables for sensitive data
4. Configure proper CORS settings for your production domain

## Features Enabled

With this Strapi integration, your scoreboard now supports:

- ✅ Real-time score updates
- ✅ Persistent data storage
- ✅ Team management (CRUD operations)
- ✅ Fallback to static data if Strapi is unavailable
- ✅ Loading states and error handling
- ✅ Automatic sorting by score

The application will gracefully fall back to static data if Strapi is not available, ensuring your scoreboard always works.
