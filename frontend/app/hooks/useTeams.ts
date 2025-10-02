import { useState, useEffect, useCallback } from 'react';
import { Team } from '../data/teams';
import { teamsApi } from '../lib/teams-api';

interface UseTeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

interface UseTeamsReturn extends UseTeamsState {
  updateTeamScore: (id: string, newScore: number) => Promise<void>;
  refreshTeams: () => Promise<void>;
  createTeam: (teamData: Omit<Team, 'id'>) => Promise<void>;
  updateTeam: (
    id: string,
    teamData: Partial<Omit<Team, 'id'>>
  ) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
}

export const useTeams = (fallbackToStatic = true): UseTeamsReturn => {
  const [state, setState] = useState<UseTeamsState>({
    teams: [],
    loading: true,
    error: null,
  });

  // Load teams from Strapi or fallback to static data
  const loadTeams = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const teams = await teamsApi.getAll();
      setState((prev) => ({ ...prev, teams, loading: false }));
    } catch (error) {
      console.error('Failed to load teams from Strapi:', error);

      if (fallbackToStatic) {
        // Fallback to static data if Strapi is not available
        const { teams: staticTeams } = await import('../data/teams');
        setState((prev) => ({
          ...prev,
          teams: staticTeams,
          loading: false,
          error: 'Using static data - Strapi connection failed',
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error ? error.message : 'Failed to load teams',
        }));
      }
    }
  }, [fallbackToStatic]);

  // Update team score
  const updateTeamScore = useCallback(async (id: string, newScore: number) => {
    try {
      const updatedTeam = await teamsApi.updateScore(id, newScore);
      setState((prev) => ({
        ...prev,
        teams: prev.teams.map((team) => (team.id === id ? updatedTeam : team)),
        error: null,
      }));
    } catch (error) {
      // Fallback to local update if Strapi fails
      setState((prev) => ({
        ...prev,
        teams: prev.teams.map((team) =>
          team.id === id ? { ...team, score: newScore } : team
        ),
        error: 'Score updated locally - Strapi connection failed',
      }));
    }
  }, []);

  // Refresh teams data
  const refreshTeams = useCallback(async () => {
    await loadTeams();
  }, [loadTeams]);

  // Create new team
  const createTeam = useCallback(async (teamData: Omit<Team, 'id'>) => {
    try {
      const newTeam = await teamsApi.create(teamData);
      setState((prev) => ({
        ...prev,
        teams: [...prev.teams, newTeam],
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to create team',
      }));
      throw error;
    }
  }, []);

  // Update team
  const updateTeam = useCallback(
    async (id: string, teamData: Partial<Omit<Team, 'id'>>) => {
      try {
        const updatedTeam = await teamsApi.update(id, teamData);
        setState((prev) => ({
          ...prev,
          teams: prev.teams.map((team) =>
            team.id === id ? updatedTeam : team
          ),
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to update team',
        }));
        throw error;
      }
    },
    []
  );

  // Delete team
  const deleteTeam = useCallback(async (id: string) => {
    try {
      await teamsApi.delete(id);
      setState((prev) => ({
        ...prev,
        teams: prev.teams.filter((team) => team.id !== id),
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete team',
      }));
      throw error;
    }
  }, []);

  // Load teams on mount
  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return {
    ...state,
    updateTeamScore,
    refreshTeams,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};
