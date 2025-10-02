export const ScoreboardHeader = () => {
  const semester = `1/2025`;

  return (
    <header className='text-center mb-12 animate-slide-up'>
      <div className='relative'>
        <h1 className='text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text mb-2 text-white font-mono pt-10'>
          CSC302 Scoreboard
        </h1>
        <div className='absolute -top-2 -right-2 text-lg text-primary-foreground font-medium font-code'>
          Semester {semester}
        </div>
      </div>
      <p className='text-xl text-primary-foreground mt-4 max-w-2xl mx-auto font-code'>
        CS Talkathon Competition • Live Rankings & Scores
      </p>
    </header>
  );
};
