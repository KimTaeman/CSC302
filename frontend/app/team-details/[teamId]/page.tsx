"use client";

import { useParams, useRouter } from "next/navigation";
import { teams, Team } from "../../data/teams";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Users, Trophy, Target } from "lucide-react";
import { notFound } from "next/navigation";

const TeamDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const teamCode = params.teamId as string;

  // Find team by code (e.g., "csc302-01")
  const team = teams.find(
    (t) => t.code.toLowerCase() === teamCode?.toLowerCase()
  );

  if (!team) {
    notFound();
  }

  const handleBackClick = () => {
    router.push("/");
  };

  const getRankColor = (team: Team) => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    const rank = sortedTeams.findIndex((t) => t.id === team.id) + 1;

    if (rank === 1) return "bg-rank-1 text-white";
    if (rank === 2) return "bg-rank-2 text-white";
    if (rank === 3) return "bg-rank-3 text-white";
    return "bg-rank-default text-white";
  };

  const getTeamRank = (team: Team) => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    return sortedTeams.findIndex((t) => t.id === team.id) + 1;
  };

  return (
    <div className="min-h-screen bg-kmutt bg-overlay">
      <div className="container mx-auto sm:px-10 py-8 content-overlay">
        {/* Header with back button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="mb-4 hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scoreboard
          </Button>

          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-bold text-foreground font-mono">
              {team.name}
            </h1>
            <Badge className={`text-lg px-3 py-1 ${getRankColor(team)}`}>
              Rank #{getTeamRank(team)}
            </Badge>
          </div>

          <p className="text-xl text-primary-foreground">
            Team Code:{" "}
            <span className="font-mono font-semibold">{team.code}</span>
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Team Info Card */}
          <Card className="p-6 bg-card border shadow-card">
            <div className="space-y-6">
              {/* Score Section */}
              <div className="text-center p-6 bg-gradient-primary rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-white">
                    Current Score
                  </h3>
                </div>
                <p className="text-6xl font-mono font-bold text-white">
                  {team.score}
                </p>
              </div>

              {/* Topic Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Presentation Topic
                  </h3>
                </div>
                <p className="text-muted-foreground bg-muted p-4 rounded-lg leading-relaxed">
                  {team.topic}
                </p>
              </div>
            </div>
          </Card>

          {/* Team Members Card */}
          <Card className="p-6 bg-card border shadow-card">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Team Members ({team.members.length})
                </h3>
              </div>

              <div className="space-y-3">
                {team.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-muted rounded-lg transition-colors hover:bg-accent"
                  >
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mr-3">
                      {index + 1}
                    </div>
                    <span className="text-foreground font-medium">
                      {member}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Summary */}
        <Card className="mt-8 p-6 bg-card border shadow-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Team Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary font-mono">
                {getTeamRank(team)}
              </p>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary font-mono">
                {team.score}
              </p>
              <p className="text-sm text-muted-foreground">Total Score</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary font-mono">
                {team.members.length}
              </p>
              <p className="text-sm text-muted-foreground">Team Size</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary font-mono">
                {teams.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Teams</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
