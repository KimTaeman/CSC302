// Simple server-side Strapi data fetching with hardcoded URLs
// This file only handles reading data from Strapi CMS

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Student interface to match Strapi Student content type
export interface Student {
  id: string;
  name: string;
  studentId: string;
}

// Team interface to match Strapi Team content type
export interface Team {
  id: string;
  name: string;
  code: string;
  topic: string;
  score: number;
  students: Student[];
}

// Strapi API response types
interface StrapiStudentResponse {
  id: number;
  name: string;
  studentId: string;
}

interface StrapiTeamResponse {
  id: number;
  name: string;
  code: string;
  topic: string;
  score: number;
  students: StrapiStudentResponse[];
}

// Convert Strapi student data to our Student interface
function convertStrapiStudent(strapiStudent: StrapiStudentResponse): Student {
  return {
    id: strapiStudent.id.toString(),
    name: strapiStudent.name,
    studentId: strapiStudent.studentId,
  };
}

// Convert Strapi team data to our Team interface
function convertStrapiTeam(strapiTeam: StrapiTeamResponse): Team {
  return {
    id: strapiTeam.id.toString(),
    name: strapiTeam.name,
    code: strapiTeam.code,
    topic: strapiTeam.topic,
    score: strapiTeam.score || 0,
    students: strapiTeam.students
      ? strapiTeam.students.map(convertStrapiStudent)
      : [],
  };
}

// Fetch all teams with their students from Strapi using hardcoded URL
export async function getTeams(): Promise<Team[]> {
  try {
    const url = `${STRAPI_URL}/api/teams?populate[students][fields][0]=name&populate[students][fields][1]=studentId&sort[0]=score%3Adesc&pagination[pageSize]=100`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch teams: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data.map(convertStrapiTeam);
  } catch (error) {
    return [];
  }
}

// Fetch a single team by ID with hardcoded URL
export async function getTeam(id: string): Promise<Team | null> {
  try {
    const url = `${STRAPI_URL}/api/teams/${id}?populate[students][fields][0]=name&populate[students][fields][1]=studentId`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch team ${id}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return convertStrapiTeam(data.data);
  } catch (error) {
    return null;
  }
}

// Fetch all students from Strapi with hardcoded URL
export async function getStudents(): Promise<Student[]> {
  try {
    const url = `${STRAPI_URL}/api/students?sort[0]=name%3Aasc&pagination[pageSize]=200`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch students: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data.map(convertStrapiStudent);
  } catch (error) {
    return [];
  }
}
