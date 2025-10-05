'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '../lib/strapi-server';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trophy, Medal, Award, ExternalLink } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  rank: number;
  isTopThree?: boolean;
  index?: number;
}

const getBorderColor = (index: number): string => {
  const colors = [
    'border-l-orange-500',
    'border-l-blue-500',
    'border-l-yellow-500',
    'border-l-green-500',
  ];
  return colors[index % colors.length];
};

const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'rank-1';
    case 2:
      return 'rank-2';
    case 3:
      return 'rank-3';
    default:
      return 'rank-default';
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className='h-6 w-6 text-rank-1' />;
    case 2:
      return <Medal className='h-6 w-6 text-rank-2' />;
    case 3:
      return <Award className='h-6 w-6 text-rank-3' />;
    default:
      return null;
  }
};

export const TeamCard = ({
  team,
  rank,
  isTopThree = false,
  index = 0,
}: TeamCardProps) => {
  const [isExpanded] = useState(isTopThree);
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/team-details/${team.code.toLowerCase()}`);
  };
  const borderColor = getBorderColor(index);
  const rankColor = getRankColor(rank);

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-card border-l-4 ${borderColor} shadow-card transition-all duration-300 animate-fade-in ${
        isTopThree ? 'md:p-8 p-4' : 'p-6'
      }`}
    >
      {/* Top 3 ranking icons on the left */}
      {isTopThree && rank <= 3 && (
        <div className='block md:absolute left-6 top-6'>
          {getRankIcon(rank)}
        </div>
      )}

      {/* Other teams ranking number on top right */}
      {!isTopThree && (
        <div
          className={`absolute top-4 right-4 ${rankColor} text-black text-xs sm:text-sm font-bold w-[30px] h-[30px] flex bg-gray-400 justify-center items-center rounded-full shadow-rank`}
        >
          {rank}
        </div>
      )}

      <div
        className={`${
          isTopThree && rank <= 3 ? 'md:ml-10' : ''
        } flex flex-col h-full`}
      >
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <h3
              className={`font-bold text-foreground mb-2 font-mono md:pr-[40px] ${
                isTopThree
                  ? 'text-lg sm:text-xl md:text-2xl'
                  : 'text-base sm:text-lg'
              }`}
            >
              {team.topic}
            </h3>
            <p
              className={`text-muted-foreground font-code ${
                isTopThree ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              }`}
            >
              {team.code}
            </p>
          </div>

          {/* Score and ranking badge for top 3 teams */}
          {isTopThree && (
            <div className='ml-4 flex flex-col items-end space-y-2'>
              <div
                className={`${rankColor} text-white shadow-rank font-bold text-sm sm:text-base md:text-lg px-2 py-1 md:px-4 md:py-2 rounded-full`}
              >
                {rank}
              </div>
            </div>
          )}
        </div>

        {/* Students section */}
        {(isTopThree || isExpanded) && (
          <div className='mb-4'>
            <div className='grid md:grid-cols-2 gap-2'>
              {team.students.map((student) => (
                <div
                  key={student.id}
                  className='text-xs sm:text-sm text-muted-foreground font-code bg-muted/50 px-3 py-1 rounded'
                  title={`Student ID: ${student.studentId}`}
                >
                  {student.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score section */}
        <div className='flex items-center justify-between mb-4 flex-grow'>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-2'>
              <span
                className={`font-bold text-score-text font-mono ${
                  isTopThree
                    ? 'text-2xl sm:text-3xl md:text-4xl'
                    : 'text-xl sm:text-2xl md:text-3xl'
                }`}
              >
                {team.score.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button - Always at bottom */}
        <div className='flex justify-end mt-auto'>
          <Button
            variant='default'
            size={isTopThree ? 'default' : 'sm'}
            onClick={handleViewDetails}
            className='bg-primary hover:bg-primary/90 text-primary-foreground'
          >
            <ExternalLink
              className={`${isTopThree ? 'h-4 w-4 mr-2' : 'h-3 w-3 mr-1'}`}
            />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
