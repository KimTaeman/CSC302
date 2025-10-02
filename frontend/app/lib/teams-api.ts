import { Team, Student } from '../data/teams';
import {
  strapiGet,
  strapiGetOne,
  strapiPost,
  strapiPut,
  strapiDelete,
  StrapiEntity,
} from './strapi';

// Strapi Student type
export interface StrapiStudent {
  name: string;
  studentId: string;
}

// Strapi Team type (matches the Team interface but with Strapi structure)
export interface StrapiTeam {
  name: string;
  code: string;
  topic: string;
  score: number;
  students: StrapiEntity<StrapiStudent>[] | number[]; // Can be populated or just IDs
}

// Convert Strapi Student entity to Student interface
const convertStrapiStudentToStudent = (
  strapiStudent: StrapiEntity<StrapiStudent>
): Student => ({
  id: strapiStudent.id.toString(),
  name: strapiStudent.attributes.name,
  studentId: strapiStudent.attributes.studentId,
});

// Convert Strapi entity to Team interface
const convertStrapiTeamToTeam = (
  strapiTeam: StrapiEntity<StrapiTeam>
): Team => ({
  id: strapiTeam.id.toString(),
  name: strapiTeam.attributes.name,
  code: strapiTeam.attributes.code,
  topic: strapiTeam.attributes.topic,
  score: strapiTeam.attributes.score,
  students: Array.isArray(strapiTeam.attributes.students)
    ? (strapiTeam.attributes.students as StrapiEntity<StrapiStudent>[]).map(
        convertStrapiStudentToStudent
      )
    : [], // Handle case where students are not populated
});

// Convert Team to Strapi format
const convertTeamToStrapiTeam = (
  team: Omit<Team, 'id'>
): Partial<StrapiTeam> => ({
  name: team.name,
  code: team.code,
  topic: team.topic,
  score: team.score,
  // Note: students relationship should be handled separately in create/update operations
});

// API functions for teams
export const teamsApi = {
  // Get all teams
  getAll: async (): Promise<Team[]> => {
    try {
      const response = await strapiGet<StrapiTeam>('teams', {
        populate: {
          students: {
            fields: ['name', 'studentId'],
          },
        },
        sort: ['score:desc'], // Sort by score descending
        pagination: {
          pageSize: 100, // Adjust based on your needs
        },
      });
      return response.data.map(convertStrapiTeamToTeam);
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw new Error('Failed to fetch teams');
    }
  },

  // Get a single team by ID
  getById: async (id: string): Promise<Team> => {
    try {
      const response = await strapiGetOne<StrapiTeam>('teams', id, {
        populate: {
          students: {
            fields: ['name', 'studentId'],
          },
        },
      });
      return convertStrapiTeamToTeam(response.data);
    } catch (error) {
      console.error(`Error fetching team ${id}:`, error);
      throw new Error(`Failed to fetch team ${id}`);
    }
  },

  // Create a new team
  create: async (teamData: Omit<Team, 'id'>): Promise<Team> => {
    try {
      const strapiTeamData = convertTeamToStrapiTeam(teamData);
      const response = await strapiPost<StrapiTeam>('teams', strapiTeamData);
      return convertStrapiTeamToTeam(response.data);
    } catch (error) {
      console.error('Error creating team:', error);
      throw new Error('Failed to create team');
    }
  },

  // Update a team
  update: async (
    id: string,
    teamData: Partial<Omit<Team, 'id'>>
  ): Promise<Team> => {
    try {
      const strapiTeamData = convertTeamToStrapiTeam(
        teamData as Omit<Team, 'id'>
      );
      const response = await strapiPut<StrapiTeam>('teams', id, strapiTeamData);
      return convertStrapiTeamToTeam(response.data);
    } catch (error) {
      console.error(`Error updating team ${id}:`, error);
      throw new Error(`Failed to update team ${id}`);
    }
  },

  // Update team score only
  updateScore: async (id: string, newScore: number): Promise<Team> => {
    try {
      const response = await strapiPut<StrapiTeam>('teams', id, {
        score: newScore,
      });
      return convertStrapiTeamToTeam(response.data);
    } catch (error) {
      console.error(`Error updating team ${id} score:`, error);
      throw new Error(`Failed to update team ${id} score`);
    }
  },

  // Delete a team
  delete: async (id: string): Promise<void> => {
    try {
      await strapiDelete('teams', id);
    } catch (error) {
      console.error(`Error deleting team ${id}:`, error);
      throw new Error(`Failed to delete team ${id}`);
    }
  },
};
