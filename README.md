# 📚 Book Nest

This is small practice project, a personal library management application that allows you to create, organize, and share your book collection. Built with SvelteKit and powered by Supabase, it features an AI-powered book scanning capability using OpenAI's GPT-4 Vision to automatically recognize books from shelf photos.

## ✨ Features

- 🔐 **User Authentication** - Secure sign-up and login with Supabase Auth
- 📖 **Personal Library** - Create and manage your digital book collection
- 📸 **AI Book Scanner** - Take a photo of your bookshelf and automatically add books using GPT-4 Vision
- ⭐ **Book Ratings** - Rate and review your books with a star rating system
- 🏷️ **Categories** - Organize books by categories
- 👤 **User Profiles** - Manage your account and settings
- 🎨 **Beautiful UI** - Clean, intuitive interface built with Svelte 5
- 🔒 **Protected Routes** - Secure private pages with authentication guards

## 🛠️ Tech Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/) v2 with Svelte 5
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Storage)
- **AI Integration**: [OpenAI GPT-4 Vision](https://openai.com/) for book recognition
- **Language**: TypeScript
- **Styling**: Custom CSS
- **Icons**: [@iconify/svelte](https://iconify.design/)
- **File Upload**: svelte-file-dropzone
- **Development**: Vite, ESLint, Prettier
- **Deployment**: [Vercel](https://vercel.com)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm**, **pnpm**, or **yarn** package manager
- **Supabase Account** - [Sign up at supabase.com](https://supabase.com)
- **OpenAI API Key** - [Get your API key from OpenAI](https://platform.openai.com/api-keys)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KimChanaDev/book-nest-svelte.git
cd book-nest-svelte
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set up Supabase

#### Option A: Use Supabase Cloud

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Project Settings > API

#### Option B: Use Supabase Local Development

```bash
# Start Supabase locally
npx supabase start
```

### 4. Set up environment variables

Create a `.env` file in the root directory and add your API keys:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_FRONTEND_URL=your_front_end_url

SUPABASE_SERVICE_ROLE_KEY=your_supabase_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Set to 'true' for testing without OpenAI API calls, 'false' for production
MOCK_OPENAI=false
```

**Note:** Variables with `PUBLIC_` prefix are exposed to the browser. Keep sensitive keys private.

### 5. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 6. (Optional) Start Supabase Studio

If using local Supabase:

```bash
npx supabase start
```

Access Supabase Studio at `http://127.0.0.1:54323`

## 🎨 Components

### Main Components

- **`HeroSection.svelte`** - Landing page hero with call-to-action
- **`AuthForm.svelte`** - Reusable authentication form for login/register
- **`BookCard.svelte`** - Display individual book information
- **`BookCategory.svelte`** - Category selector for books
- **`StarRating.svelte`** - Interactive star rating component
- **`Button.svelte`** - Reusable button component
- **`Header.svelte`** - Navigation header
- **`SideNavigation.svelte`** - Sidebar navigation for authenticated users

## 📱 Pages & Routes

### Public Routes

- `/` - Landing page
- `/login` - User login page
- `/register` - User registration page

### Protected Routes (Requires Authentication)

- `/private/dashboard` - User's book library overview
- `/private/book/[bookId]` - Individual book details page
- `/private/scan-shelf` - AI-powered book scanner
- `/private/settings` - Account settings and profile management

## 🤖 AI Book Scanner

The book scanner feature uses OpenAI's GPT-4 Vision model to:

1. Accept a photo of your bookshelf (via drag-and-drop or file upload)
2. Analyze the image and extract book titles and authors
3. Return a structured JSON array of recognized books
4. Allow you to review and add books to your library in bulk

## 🏗️ Project Structure

```
book-nest/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   ├── state/          # State management
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── routes/             # SvelteKit routes
│   │   ├── api/            # API endpoints
│   │   ├── auth/           # Authentication routes
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── private/        # Protected routes
│   ├── app.css             # Global styles
│   ├── app.html            # HTML template
│   └── hooks.server.ts     # Server-side hooks & middleware
├── static/                 # Static assets
├── supabase/
│   ├── config.toml         # Supabase configuration
│   └── migrations/         # Database migrations
└── package.json
```

## 🚀 Deploy to Vercel

The easiest way to deploy your Book Nest application is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Alternative: Deploy with Adapter

For other platforms, you can change the adapter in `svelte.config.js`:

```bash
# Install specific adapter
npm install -D @sveltejs/adapter-cloudflare # for Cloudflare Workers and Cloudflare Pages
npm install -D @sveltejs/adapter-node # for Node servers
npm install -D @sveltejs/adapter-static # for static site generation (SSG)
npm install -D @sveltejs/adapter-vercel # for Vercel
npm install -D @sveltejs/adapter-netlify # for Netlify
```

## 🔧 Configuration

### Path Aliases

The project uses custom path aliases configured in `svelte.config.js`:

- `$components` → `src/lib/components`
- `$assets` → `src/lib/assets`
- `$state` → `src/lib/state`
