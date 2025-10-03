import { Team } from '../lib/strapi-server';
import { Card } from './ui/card';
import { Trophy, Users, Target, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  teams: Team[];
}

export const StatsPanel = ({ teams }: StatsPanelProps) => {
  const totalTeams = teams.length;
  const teamsWithScores = teams.filter((team) => team.score > 0).length;
  const averageScore =
    teams.length > 0
      ? (
          teams.reduce((sum, team) => sum + team.score, 0) / teams.length
        ).toFixed(1)
      : '0.0';
  const highestScore = Math.max(...teams.map((team) => team.score), 0).toFixed(
    1
  );

  const stats = [
    {
      icon: Users,
      label: 'Total Teams',
      value: totalTeams,
      color: 'team-blue',
    },
    {
      icon: Target,
      label: 'Presented',
      value: teamsWithScores,
      color: 'team-green',
    },
    {
      icon: TrendingUp,
      label: 'Avg Score',
      value: averageScore,
      color: 'team-yellow',
    },
    {
      icon: Trophy,
      label: 'Top Score',
      value: highestScore,
      color: 'team-orange',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className='p-4 bg-gradient-card shadow-card transition-all duration-300'
        >
          <div className='flex flex-col md:flex-row items-center md:space-x-3'>
            <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
              <stat.icon className={`h-5 w-5 text-${stat.color}`} />
            </div>
            <div className='text-center md:text-left'>
              <p className='text-xs sm:text-sm text-muted-foreground font-code'>
                {stat.label}
              </p>
              <p className='text-lg sm:text-xl md:text-2xl font-bold text-foreground font-mono'>
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
