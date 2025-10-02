# CSC302 Scoreboard

A modern, real-time scoreboard application for CSC302 course presentations, built with Next.js and integrated with Strapi CMS for dynamic data management.

## Features

- 🏆 **Real-time Scoreboard**: Live score updates with automatic ranking
- 📊 **Statistics Panel**: Overview of teams, average scores, and top performers
- 🎯 **Team Management**: Full CRUD operations for teams via Strapi integration
- 🔄 **Fallback Support**: Gracefully falls back to static data if Strapi is unavailable
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js and optimized for speed
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Strapi CMS (optional)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd csc302_scoreboard
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Strapi Configuration (optional)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

### 3. Run the Application

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your scoreboard!

## Strapi Integration

This project supports both static data and dynamic Strapi CMS integration:

### Option 1: Static Data (Default)

The application works out of the box with predefined team data located in `app/data/teams.ts`.

### Option 2: Strapi CMS Integration

For dynamic data management, follow the [Strapi Setup Guide](STRAPI_SETUP.md).

#### Quick Strapi Setup:

1. Create a new Strapi project: `npx create-strapi-app@latest csc302-scoreboard-backend --quickstart`
2. Configure the Team content type (see [STRAPI_SETUP.md](STRAPI_SETUP.md))
3. Import existing data: `pnpm import-teams`
4. Update your `.env.local` with Strapi URL

## Project Structure

```
csc302_scoreboard/
├── app/
│   ├── components/          # React components
│   │   ├── ScoreboardHeader.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── TeamCard.tsx
│   │   └── ui/             # Reusable UI components
│   ├── data/
│   │   └── teams.ts        # Static team data
│   ├── hooks/
│   │   └── useTeams.ts     # Custom hook for team data management
│   ├── lib/
│   │   ├── strapi.ts       # Strapi API client
│   │   ├── teams-api.ts    # Teams API service
│   │   └── utils.ts        # Utility functions
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── scripts/
│   └── import-teams.js     # Data import script
├── .env.example            # Environment variables template
├── STRAPI_SETUP.md         # Detailed Strapi setup guide
└── README.md               # This file
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm import-teams` - Import team data to Strapi

## Team Data Structure

Each team has the following properties:

```typescript
interface Team {
  id: string;
  name: string; // Team identifier (e.g., "CSC302-01")
  code: string; // Team code
  topic: string; // Presentation topic
  score: number; // Current score
  members: string[]; // Array of team member names
}
```

## Features in Detail

### Real-time Updates

- Scores are updated in real-time across all connected clients
- Automatic sorting by score with live ranking updates
- Optimistic updates with fallback error handling

### Responsive Design

- **Desktop**: Full grid layout with detailed team cards
- **Mobile**: Stacked layout optimized for touch interaction
- **Top 3 Teams**: Special highlighting and full-width display

### Error Handling

- Graceful fallback to static data if Strapi is unavailable
- User-friendly error messages and loading states
- Retry mechanisms for failed API calls

### Data Management

- Full CRUD operations through Strapi integration
- Bulk import/export capabilities
- Data persistence across sessions

## Customization

### Adding New Teams

1. **Static**: Edit `app/data/teams.ts`
2. **Strapi**: Use the admin panel or import script

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize the color scheme in `tailwind.config.ts`

### API Configuration

- Modify `app/lib/strapi.ts` for API client settings
- Update `app/lib/teams-api.ts` for custom endpoints

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `pnpm lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:

1. Check the [Strapi Setup Guide](STRAPI_SETUP.md)
2. Review the project documentation
3. Create an issue in the repository

---

Built with ❤️ for CSC302 course presentations
