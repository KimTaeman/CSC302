import { getTeams, Team } from '../../lib/strapi-server';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Users, Trophy, Target } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TeamDetailsPageProps {
  params: {
    teamId: string;
  };
}

const TeamDetailsPage = async ({ params }: TeamDetailsPageProps) => {
  const teamCode = params.teamId;

  // Fetch all teams to find the one we want and calculate rankings
  const teams = await getTeams();

  // Find team by code (e.g., "csc302-01")
  const team = teams.teams.find(
    (t) => t.code.toLowerCase() === teamCode?.toLowerCase()
  );

  if (!team) {
    notFound();
  }

  const getRankColor = (team: Team) => {
    const sortedTeams = [...teams.teams].sort((a, b) => b.score - a.score);
    const rank = sortedTeams.findIndex((t) => t.id === team.id) + 1;

    if (rank === 1) return 'bg-rank-1 text-white';
    if (rank === 2) return 'bg-rank-2 text-white';
    if (rank === 3) return 'bg-rank-3 text-white';
    return 'bg-rank-default text-white';
  };

  const getTeamRank = (team: Team) => {
    const sortedTeams = [...teams.teams].sort((a, b) => b.score - a.score);
    return sortedTeams.findIndex((t) => t.id === team.id) + 1;
  };

  return (
    <div className='min-h-screen bg-kmutt bg-overlay'>
      <div className='container mx-auto px-10 py-8 content-overlay'>
        {/* Header with back button */}
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center px-4 py-2 mb-4 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Scoreboard
          </Link>

          <div className='flex items-center gap-4 mb-2'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground font-mono'>
              {team.name}
            </h1>
            <Badge
              className={`text-sm sm:text-base md:text-lg px-3 py-1 ${getRankColor(
                team
              )} text-muted-foreground`}
            >
              Rank #{getTeamRank(team)}
            </Badge>
          </div>

          <p className='text-base sm:text-lg md:text-xl text-primary-foreground'>
            Team Code:{' '}
            <span className='font-mono font-semibold'>{team.code}</span>
          </p>
        </div>

        {/* Main content grid */}
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Team Info Card */}
          <Card className='p-6 bg-card border shadow-card'>
            <div className='space-y-6'>
              {/* Score Section */}
              <div className='text-center p-6 bg-gradient-primary rounded-lg'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <Trophy className='w-6 h-6 text-yellow-500' />
                  <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white'>
                    Current Score
                  </h3>
                </div>
                <p className='text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-white'>
                  {team.score}
                </p>
              </div>

              {/* Topic Section */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Target className='w-5 h-5 text-primary' />
                  <h3 className='text-lg sm:text-xl font-semibold text-foreground'>
                    Presentation Topic
                  </h3>
                </div>
                <p className='text-muted-foreground bg-muted p-4 rounded-lg leading-relaxed'>
                  {team.topic}
                </p>
              </div>
            </div>
          </Card>

          {/* Team Members Card */}
          <Card className='p-6 bg-card border shadow-card'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 mb-4'>
                <Users className='w-5 h-5 text-primary' />
                <h3 className='text-lg sm:text-xl font-semibold text-foreground'>
                  Team Students ({team.students.length})
                </h3>
              </div>

              <div className='space-y-3'>
                {team.students.map((student, index) => (
                  <div
                    key={student.id}
                    className='flex items-center p-3 bg-muted rounded-lg transition-colors hover:bg-accent group'
                  >
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mr-3 group-hover:bg-muted group-hover:text-accent transition-colors'>
                      {index + 1}
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-foreground font-medium group-hover:text-white transition-colors'>
                        {student.name}
                      </span>
                      <span className='text-xs sm:text-sm text-muted-foreground group-hover:text-muted transition-colors'>
                        ID: {student.studentId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Summary */}
        <Card className='mt-8 p-6 bg-card border shadow-card'>
          <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-4'>
            Team Statistics
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center p-4 bg-muted rounded-lg'>
              <p className='text-lg sm:text-xl md:text-2xl font-bold text-primary font-mono'>
                {getTeamRank(team)}
              </p>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Current Rank
              </p>
            </div>
            <div className='text-center p-4 bg-muted rounded-lg'>
              <p className='text-lg sm:text-xl md:text-2xl font-bold text-primary font-mono'>
                {team.score}
              </p>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Total Score
              </p>
            </div>
            <div className='text-center p-4 bg-muted rounded-lg'>
              <p className='text-lg sm:text-xl md:text-2xl font-bold text-primary font-mono'>
                {team.students.length}
              </p>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Team Size
              </p>
            </div>
            <div className='text-center p-4 bg-muted rounded-lg'>
              <p className='text-lg sm:text-xl md:text-2xl font-bold text-primary font-mono'>
                {teams.teams.length}
              </p>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Total Teams
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
