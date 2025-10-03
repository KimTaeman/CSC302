# Updated Strapi Setup Guide for CSC302 Scoreboard

This guide reflects the updated structure with separate Student and Team content types and their relationships.

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

## Step 2: Create Content Types

### A. Create Student Content Type

1. Start your Strapi development server:

   ```bash
   npm run develop
   ```

2. Open your browser and go to `http://localhost:1337/admin`

3. Create an admin account when prompted

4. In the admin panel, go to **Content-Types Builder**

5. Click **"Create new collection type"**

6. Name it `student` (Strapi will pluralize it to `students`)

7. Add the following fields for Student:

   | Field Name  | Field Type | Settings         |
   | ----------- | ---------- | ---------------- |
   | `name`      | Text       | Required         |
   | `studentId` | Text       | Required, Unique |

8. Click **Save** (don't restart yet)

### B. Create Team Content Type

1. Click **"Create new collection type"** again

2. Name it `team` (Strapi will pluralize it to `teams`)

3. Add the following fields for Team:

   | Field Name | Field Type       | Settings             |
   | ---------- | ---------------- | -------------------- |
   | `name`     | Text             | Required             |
   | `code`     | Text             | Required, Unique     |
   | `topic`    | Long text        | Required             |
   | `score`    | Number (integer) | Required, Default: 0 |

4. Click **Save** (don't restart yet)

### C. Add Student Relationship to Team

1. In the Team content type, click **"Add another field"**

2. Select **Relation**

3. Configure the relationship:

   - **Relation name**: `students`
   - **Select a target**: Student
   - **Relation type**: Team has many Students (one-to-many)

4. Click **Finish**

5. Click **Save** and restart Strapi when prompted

## Step 3: Configure API Permissions

1. Go to **Settings** > **Users & Permissions Plugin** > **Roles**

2. Click on **Public** role

3. Under **Permissions**, expand both **Student** and **Team**

4. Check the following permissions for **Student**:

   - `find` (to get all students)
   - `findOne` (to get a single student)
   - `create` (to create new students)
   - `update` (to update students)
   - `delete` (to delete students)

5. Check the following permissions for **Team**:

   - `find` (to get all teams)
   - `findOne` (to get a single team)
   - `create` (to create new teams)
   - `update` (to update teams)
   - `delete` (to delete teams)

6. Click **Save**

## Step 4: Import Your Data

### Option A: Using the New Import Script

1. In your Next.js project, run:
   ```bash
   pnpm import-data
   ```

This script will:

- Create all students first
- Create teams and link them to their students
- Handle relationships properly

### Option B: Manual Entry

1. Go to **Content Manager** > **Student**
2. Create students first with their names and student IDs
3. Then go to **Content Manager** > **Team**
4. Create teams and select their students from the relationship field

## Step 5: Environment Configuration

Create or update your `.env.local` file in your Next.js project:

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

## Step 6: Test the Integration

1. Start your Strapi server: `npm run develop` (in the Strapi project)
2. Start your Next.js app: `pnpm dev` (in your scoreboard project)
3. Visit your scoreboard application
4. You should see teams with their student information loaded from Strapi

## API Structure

### Teams API Response

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "CSC302-01",
        "code": "CSC302-01",
        "topic": "Can Your Phone Be Hacked? Understanding Cyber Threats",
        "score": 0,
        "students": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "name": "MS.CHAYADA MUANGBOONSRI",
                "studentId": "STU001"
              }
            }
          ]
        }
      }
    }
  ]
}
```

## Key Features

✅ **Separate Student Management**: Students are now independent entities
✅ **Relationship Management**: Teams are properly linked to students
✅ **Student ID Tracking**: Each student has a unique student ID
✅ **Scalable Structure**: Easy to add more student or team fields
✅ **Data Integrity**: Relationships ensure data consistency

## Troubleshooting

### Common Issues:

1. **Relationship Not Populating**:

   - Make sure you're using `populate: { students: { fields: ['name', 'studentId'] } }` in API calls
   - Check that the relationship is properly configured in Strapi

2. **Import Script Fails**:

   - Ensure both Student and Team content types exist
   - Verify API permissions are set for both content types
   - Check that Strapi is running and accessible

3. **Students Not Displaying**:

   - Verify the relationship is populated in API responses
   - Check that the component is using `team.students` instead of `team.members`

4. **API Errors**:
   - Check browser console for detailed error messages
   - Verify API endpoints: `http://localhost:1337/api/students` and `http://localhost:1337/api/teams`
   - Test with populate parameter: `http://localhost:1337/api/teams?populate=students`

## Next Steps

- Add more student fields (email, phone, etc.) if needed
- Implement student search and filtering
- Add team management features (add/remove students)
- Set up user authentication for admin features

Your scoreboard now has a proper relational database structure that matches your Strapi CMS setup!

