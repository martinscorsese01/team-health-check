# Team Health Check Application

## Solution Overview
A full-stack enterprise application designed to track and monitor team member wellbeing in real-time. The application provides a simple, intuitive interface for team members to submit their daily/weekly health checks, capturing their current state of mind and tracking sentiment over time.

## Project Aim & Objectives
- **Primary Goal**: Create a scalable, secure platform for tracking team member wellbeing
- **Key Objectives**:
  1. Implement secure data submission and storage
  2. Enable real-time updates across all users
  3. Provide an intuitive, accessible interface
  4. Ensure data persistence and reliability
  5. Maintain enterprise-grade security standards

## Enterprise Considerations

### Performance
- Server-side rendering with Next.js 14 for optimal performance
- Efficient database queries using Supabase
- Global CDN distribution via Vercel
- Optimized React components with TypeScript
- Form validation using Zod for immediate feedback

### Scalability
- Serverless architecture using Next.js API routes
- Supabase's scalable PostgreSQL database
- Modular component design
- Stateless architecture for horizontal scaling
- Cloud-based deployment ready

### Security
- Environment variables protection
- Input validation and sanitization using Zod schema
- Row Level Security (RLS) in Supabase
- CORS protection
- XSS prevention through React's built-in protections

### Robustness
- Error boundary implementation
- Form validation with detailed error messages
- Graceful error handling in API routes
- Type safety with TypeScript
- Consistent error reporting

### Deployment
- Vercel for frontend and API routes
- Supabase for database management
- Automated deployments via GitHub integration
- Environment variable management
- Global CDN distribution

## Technical Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **API Layer**: Next.js API Routes
- **Backend**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form, Zod
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Installation & Usage

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/team-health-check.git
   cd team-health-check
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Feature Overview

### Health Check Submission
- **Location**: `/src/app/page.tsx`
- **Purpose**: Enable team members to submit their current state
- **Features**:
  - Real-time form validation
  - Date selection
  - Feeling selection
  - Immediate feedback
  - Error handling

### Health Check History
- **Location**: `/src/app/components/HealthCheckList.tsx`
- **Purpose**: Display recent submissions
- **Features**:
  - Chronological ordering
  - Formatted timestamps
  - Real-time updates
  - Responsive design

### API Routes
- **Location**: `/src/app/api/health-checks/route.ts`
- **Purpose**: Handle data operations
- **Features**:
  - CRUD operations
  - Input validation
  - Error handling
  - Type safety

## Database Schema

### Team Health Table
```sql
Table: team-health
- id: int8 (primary key)
- name: text
- feeling: text
- date: timestamptz
```

## Known Issues & Future Enhancements

### Current Limitations
- No user authentication system
- Limited data visualization
- Basic error handling

### Planned Improvements
1. User Authentication
   - Login/Register functionality
   - Role-based access control
   - Session management

2. Enhanced Analytics
   - Trend visualization
   - Sentiment analysis
   - Team statistics

3. Administrative Features
   - Team management
   - Data export
   - Custom reporting

4. UI/UX Enhancements
   - Dark mode
   - Customizable themes
   - Accessibility improvements

## References
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)

## Live Demo
The application is deployed and accessible at: [https://team-health-check-xi.vercel.app/](https://team-health-check-xi.vercel.app/) 