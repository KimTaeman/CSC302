export const ScoreboardHeader = () => {
  const semester = `1/2025`;

  return (
    <header className="text-center mb-12 animate-slide-up">
      <div className="flex justify-end items-center">
        <div className="text-lg text-primary-foreground font-medium font-code">
          Semester {semester}
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text mb-2 text-gray-900 font-mono">
        CSC302 Scoreboard
      </h1>
      <p className="text-xl text-primary-foreground mt-4 max-w-2xl mx-auto font-code">
        CS Talkathon Competition • Live Rankings & Scores
      </p>
      <p className="text-sm text-primary-foreground mt-4 max-w-2xl mx-auto font-code">
        Last Updated at
      </p>
    </header>
  );
};
