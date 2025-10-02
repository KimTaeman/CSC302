import { TeamCard } from './components/TeamCard';
import { ScoreboardHeader } from './components/ScoreboardHeader';
import { StatsPanel } from './components/StatsPanel';
import { getTeams } from './lib/strapi-server';

export default async function Home() {
  // Fetch teams data on the server side
  const teams = await getTeams();

  // Sort teams by score (descending) and assign ranks
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className='min-h-screen bg-kmutt bg-overlay'>
      <div className='container mx-auto px-10 py-8 content-overlay'>
        <ScoreboardHeader />

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
