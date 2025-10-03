import type { Config } from 'tailwindcss';

export default {
  // darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  safelist: [
    'border-l-team-orange',
    'border-l-team-blue',
    'border-l-team-yellow',
    'border-l-team-green',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        mono: [
          'var(--font-jetbrains-mono)',
          'var(--font-fira-code)',
          'var(--font-geist-mono)',
          'monospace',
        ],
        code: [
          'var(--font-fira-code)',
          'var(--font-jetbrains-mono)',
          'var(--font-geist-mono)',
          'monospace',
        ],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'team-orange': 'hsl(var(--team-orange))',
        'team-blue': 'hsl(var(--team-blue))',
        'team-yellow': 'hsl(var(--team-yellow))',
        'team-green': 'hsl(var(--team-green))',
        'rank-1': 'hsl(var(--rank-1))',
        'rank-2': 'hsl(var(--rank-2))',
        'rank-3': 'hsl(var(--rank-3))',
        'rank-default': 'hsl(var(--rank-default))',
        'score-text': 'hsl(var(--score-text))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          from: {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        rank: 'var(--shadow-rank)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
