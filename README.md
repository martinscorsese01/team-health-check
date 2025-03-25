# Team Health Check App

A modern web application for tracking team members' emotional well-being using Next.js, React, TypeScript, and Supabase.

## Features

- Submit daily health checks with name, feeling, and timestamp
- View recent health check entries
- Responsive design with Tailwind CSS
- Form validation with Zod
- Real-time updates

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account and project

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd health-check-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Supabase project and set up the database:
   - Create a new project in Supabase
   - Create a table called `health_checks` with the following columns:
     - `id`: UUID (primary key)
     - `name`: string
     - `feeling`: string
     - `date`: timestamp with timezone
     - `created_at`: timestamp (auto-generated)

4. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase project URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase
- React Hook Form
- Zod

## License

ISC 