# SaaS Template

A production-ready Next.js SaaS template with Untitled UI components.

## Features

- ✅ **Next.js 14** with App Router
- ✅ **Untitled UI** component library (buttons, inputs, forms, etc.)
- ✅ **Tailwind CSS** with design token system
- ✅ **TypeScript** for type safety
- ✅ **Dark mode ready** (CSS variables support)
- ✅ **Supabase ready** (auth, database)
- ✅ **Responsive design**

## Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, signup, forgot-password)
│   │   └── layout.tsx    # Centered auth layout
│   ├── (dashboard)/      # Protected dashboard pages
│   │   └── layout.tsx    # Sidebar layout
│   ├── (admin)/          # Admin-only pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── base/             # Untitled UI components
│   │   ├── avatar/
│   │   ├── badges/
│   │   ├── buttons/
│   │   ├── checkbox/
│   │   ├── dropdown/
│   │   ├── form/
│   │   ├── input/
│   │   ├── progress-indicators/
│   │   ├── radio-buttons/
│   │   ├── tabs/
│   │   ├── theme-toggle/
│   │   └── tooltip/
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities (Supabase client, etc.)
├── hooks/                # Custom React hooks
├── styles/
│   ├── globals.css       # Global styles
│   └── theme.css         # Design tokens
└── utils/                # Helper functions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Set up Supabase:
   - Create a project at supabase.com
   - Add your URL and anon key to `.env.local`

4. Run development server:
   ```bash
   npm run dev
   ```

## Customization

### Brand Colors

Edit the brand colors in `src/styles/theme.css`:

```css
--color-brand-500: rgb(158 119 237);  /* Primary brand color */
--color-brand-600: rgb(127 86 217);   /* Darker shade */
/* ... etc */
```

### Components

Untitled UI components are in `src/components/base/`. They use:
- `react-aria-components` for accessibility
- CSS variables for theming
- Tailwind for styling

## Deployment

Deploy to Railway:
```bash
railway up
```

Or any Next.js compatible platform (Vercel, Netlify, etc.)

## Template Usage (SaaS Factory)

This template is designed to be cloned for each new SaaS product:

1. Clone this template
2. Update brand colors in `theme.css`
3. Update metadata in `layout.tsx`
4. Implement product-specific features
5. Deploy

---

Built with ❤️ for the SaaS Factory
