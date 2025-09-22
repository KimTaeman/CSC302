'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '../data/teams';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Edit3,
  Check,
  X,
  Trophy,
  Medal,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';

interface TeamCardProps {
  team: Team;
  rank: number;
  onScoreUpdate: (id: string, newScore: number) => void;
  isTopThree?: boolean;
}

const getBorderColor = (index: number): string => {
  const colors = ['team-orange', 'team-blue', 'team-yellow', 'team-green'];
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
  onScoreUpdate,
  isTopThree = false,
}: TeamCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editScore, setEditScore] = useState(team.score.toString());
  const [isExpanded, setIsExpanded] = useState(isTopThree);
  const router = useRouter();

  const handleSave = () => {
    const newScore = parseFloat(editScore) || 0;
    onScoreUpdate(team.id, newScore);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditScore(team.score.toString());
    setIsEditing(false);
  };

  const handleViewDetails = () => {
    router.push(`/team-details/${team.code.toLowerCase()}`);
  };

  const borderColor = getBorderColor(parseInt(team.id) - 1);
  const rankColor = getRankColor(rank);

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-card border-l-4 border-l-${borderColor} shadow-card transition-all duration-300 animate-fade-in ${
        isTopThree ? 'p-8' : 'p-6'
      }`}
    >
      {/* Top 3 ranking icons on the left */}
      {isTopThree && rank <= 3 && (
        <div className='absolute left-6 top-6'>{getRankIcon(rank)}</div>
      )}

      {/* Other teams ranking number on top right */}
      {!isTopThree && (
        <div
          className={`absolute top-4 right-4 ${rankColor} text-black text-sm border border-gray-600 font-bold w-[30px] h-[30px] flex bg-gray-400 justify-center items-center rounded-full shadow-rank`}
        >
          {rank}
        </div>
      )}

      <div className={`${isTopThree && rank <= 3 ? 'ml-10' : ''}`}>
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <h3
              className={`font-bold text-foreground mb-2 font-mono pr-[40px] ${
                isTopThree ? 'text-2xl' : 'text-lg'
              }`}
            >
              {team.topic}
            </h3>
            <p
              className={`text-muted-foreground font-code ${
                isTopThree ? 'text-base' : 'text-sm'
              }`}
            >
              {team.code}
            </p>
          </div>

          {/* Score and ranking badge for top 3 teams */}
          {isTopThree && (
            <div className='ml-4 flex flex-col items-end space-y-2'>
              <div
                className={`${rankColor} text-white shadow-rank font-bold text-lg px-4 py-2 rounded-full`}
              >
                {rank}
              </div>
            </div>
          )}
        </div>

        {/* Members section */}
        {(isTopThree || isExpanded) && (
          <div className='mb-4'>
            <div className='grid grid-cols-2 gap-2'>
              {team.members.map((member, index) => (
                <div
                  key={index}
                  className='text-sm text-muted-foreground font-code bg-muted/50 px-3 py-1 rounded'
                >
                  {member}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score section */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-2'>
              <span
                className={`font-bold text-score-text font-mono ${
                  isTopThree ? 'text-4xl' : 'text-3xl'
                }`}
              >
                {team.score.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className='flex justify-end'>
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
