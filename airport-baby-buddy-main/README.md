# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2e8feb73-1571-451d-9423-b98985c1c4cc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2e8feb73-1571-451d-9423-b98985c1c4cc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & API)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2e8feb73-1571-451d-9423-b98985c1c4cc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Supabase Setup

This project uses Supabase for backend services. To set up Supabase:

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env` file based on `.env.example`
4. Add your Supabase credentials to the `.env` file
5. Set up your database schema (see database schema section below)

### Database Schema

You'll need to create the following tables in your Supabase database:

```sql
-- Vending Machines table
CREATE TABLE vending_machines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  airport_code VARCHAR(10) NOT NULL,
  airport_name VARCHAR(255) NOT NULL,
  terminal VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  hours VARCHAR(100) NOT NULL,
  supplies TEXT[] NOT NULL DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0.0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Location Requests table
CREATE TABLE location_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  airport VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Supplies table
CREATE TABLE supplies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_level INTEGER DEFAULT 0,
  vending_machine_id UUID REFERENCES vending_machines(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vending_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to vending machines
CREATE POLICY "Allow public read access to active vending machines" ON vending_machines
  FOR SELECT USING (status = 'active');

-- Create policies for location requests
CREATE POLICY "Allow public insert on location requests" ON location_requests
  FOR INSERT WITH CHECK (true);

-- Create policies for supplies
CREATE POLICY "Allow public read access to supplies" ON supplies
  FOR SELECT USING (true);
```

### API Usage

The app includes several API utilities:

- `vendingMachineApi` - CRUD operations for vending machines
- `locationRequestApi` - Submit and manage location requests
- `supplyApi` - Manage supplies and inventory
- `analyticsApi` - Get analytics and statistics
- `subscriptions` - Real-time updates via Supabase subscriptions

### Custom Hooks

- `useVendingMachines` - Fetch and search vending machines
- `useLocationRequests` - Submit location requests
