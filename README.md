# Webalize

A modern CMS application built with Payload CMS 3.0 and Next.js 15, featuring server-side rendering, internationalization, and comprehensive content management capabilities.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `^18.20.2 || >=20.9.0`
- **pnpm**: `^9 || ^10` (required package manager)
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:HajMichal/payloaaad.git
   cd webalize
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   
   Edit the `.env` file with your configuration:

   ```env
   # Database Configuration
   # For SQLite (default):
   DATABASE_URL=file:./webalize.db
   
   # For MongoDB (alternative):
   # DATABASE_URL=mongodb://127.0.0.1/webalize
   
   # Payload Secret (required)
   # Generate a secure random string for production
   PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
   
   # Admin Auto-Login (optional, for development only)
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=password
   
   # Public URL (required for CSRF protection)
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

   **Important Notes:**
   - `PAYLOAD_SECRET`: Use a strong random string in production (minimum 32 characters recommended)
   - `DATABASE_URL`: The project is configured to use SQLite by default. Change to MongoDB URL if needed
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Only used for auto-login in development. Remove in production
   - `NEXT_PUBLIC_URL`: Must match your actual domain in production

5. **Generate TypeScript types**
   ```bash
   pnpm generate:types
   ```

6. **Generate import map** (if using custom components)
   ```bash
   pnpm generate:importmap
   ```

## 🏃 Running the Project

### Development Mode

Start the development server:

```bash
 pnpm dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### Seed Database (Optional)

Populate the database with sample data:

```bash
pnpm seed
```

This will create:
- Admin user
- Sample users (admin, writer, regular user)
- Media files
- Sample posts
- FAQ entries
- Integration partners
- Contact submissions

**Note**: Make sure you have media files uploaded through the admin panel before seeding posts, or the seed script will skip posts.

### Production Build

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start production server**
   ```bash
   pnpm start
   ```

## 🧪 Testing

### Run all tests
```bash
pnpm test
```

### Run integration tests only
```bash
pnpm test:int
```


**Note**: E2E tests require the dev server to be running. Playwright will start it automatically.

## 📁 Project Structure

```
webalize/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Frontend routes (Server Components)
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── news/            # News listing and detail pages
│   │   │   ├── faq/             # FAQ page
│   │   │   ├── integrations/    # Integrations page
│   │   │   └── ...
│   │   └── (payload)/           # Payload admin routes
│   │       └── admin/           # Admin panel
│   ├── collections/             # Payload collections
│   │   ├── users/              # Users collection (auth-enabled)
│   │   ├── Posts.ts            # Blog posts
│   │   ├── FAQ.ts              # FAQ entries
│   │   ├── Integrations.ts     # Integration partners
│   │   ├── Contact.ts          # Contact form submissions
│   │   └── Media.ts            # Media uploads
│   ├── globals/                 # Payload globals
│   │   └── Settings.ts         # Site settings
│   ├── lib/
│   │   ├── access/             # Access control functions
│   │   ├── data/               # Data fetching functions (Server Components)
│   │   ├── types/              # TypeScript types
│   │   └── validation/         # Zod validation schemas
│   ├── scripts/                # Seed scripts
│   └── payload.config.ts       # Payload configuration
├── tests/
│   ├── int/                    # Integration tests
│   └── e2e/                    # E2E tests
└── package.json
```

## 🔐 Access Control

The application implements role-based access control (RBAC):

- **Admin**: Full access to all collections
- **Writer**: Can create/edit posts, FAQs, integrations
- **User**: Can only read published content

## 🌍 Internationalization

The application supports multiple locales:
- **English (en)** - Default
- **German (de)**

Localized collections:
- Posts (title, description, content)
- FAQ (category, description, items)
- Integrations (slogan)


## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Database connection string | `file:./webalize.db` (SQLite) or `mongodb://127.0.0.1/webalize` (MongoDB) |
| `PAYLOAD_SECRET` | Yes | Secret key for JWT encryption | Random 32+ character string |
| `ADMIN_EMAIL` | No | Auto-login email (dev only) | `admin@example.com` |
| `ADMIN_PASSWORD` | No | Auto-login password (dev only) | `password` |
| `NEXT_PUBLIC_URL` | Yes | Public URL for CSRF protection | `http://localhost:3000` |


## 🔧 Development Tips

1. **After modifying collections**: Always run `pnpm generate:types` to update TypeScript types
2. **After adding custom components**: Run `pnpm generate:importmap` to update the import map
3. **Database location**: SQLite database is stored at `./webalize.db` (gitignored)
4. **Type checking**: Run `tsc --noEmit` to validate TypeScript without building

## 📚 Key Features

- ✅ Server Components (Next.js App Router)
- ✅ Payload CMS 3.0 with Lexical editor
- ✅ Role-based access control
- ✅ Internationalization (i18n)
- ✅ Draft & versioning system
- ✅ Media uploads with Sharp image processing
- ✅ GraphQL API (auto-generated)
- ✅ REST API (auto-generated)
- ✅ Comprehensive test coverage

## 🚨 Troubleshooting

### Database locked error (SQLite)
- Make sure no other process is accessing the database
- Check if the dev server is already running

### Type errors after schema changes
- Run `pnpm generate:types` to regenerate types

### Import map errors
- Run `pnpm generate:importmap` after adding custom components

### Port 3000 already in use
- Change the port: `PORT=3001 pnpm dev`
- Or stop the process using port 3000



