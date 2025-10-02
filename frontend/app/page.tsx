'use client';

import { TeamCard } from './components/TeamCard';
import { ScoreboardHeader } from './components/ScoreboardHeader';
import { StatsPanel } from './components/StatsPanel';
import { useTeams } from './hooks/useTeams';

export default function Home() {
  const { teams, loading, error, updateTeamScore } = useTeams();

  const handleScoreUpdate = async (id: string, newScore: number) => {
    await updateTeamScore(id, newScore);
  };

  // Sort teams by score (descending) and assign ranks
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  if (loading) {
    return (
      <div className='min-h-screen bg-kmutt bg-overlay'>
        <div className='container mx-auto px-10 py-8 content-overlay'>
          <ScoreboardHeader />
          <div className='flex items-center justify-center py-20'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-foreground mx-auto mb-4'></div>
              <p className='text-primary-foreground text-lg'>
                Loading teams...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-kmutt bg-overlay'>
      <div className='container mx-auto px-10 py-8 content-overlay'>
        <ScoreboardHeader />

        {error && (
          <div className='mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg'>
            <p className='font-medium'>⚠️ {error}</p>
          </div>
        )}

        <StatsPanel teams={teams} />

        {/* Top 3 teams - full width */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-primary-foreground mb-6 font-mono'>
            Top 3 Teams
          </h2>
          <div className='space-y-4'>
            {sortedTeams.slice(0, 3).map((team, index) => (
              <TeamCard
                key={team.id}
                team={team}
                rank={index + 1}
                onScoreUpdate={handleScoreUpdate}
                isTopThree={true}
              />
            ))}
          </div>
        </div>

        {/* Other teams - 3 column grid */}
        {sortedTeams.length > 3 && (
          <div>
            <h2 className='text-2xl font-bold text-primary-foreground mb-6 font-mono'>
              Runners up
            </h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {sortedTeams.slice(3).map((team, index) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  rank={index + 4}
                  onScoreUpdate={handleScoreUpdate}
                  isTopThree={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
