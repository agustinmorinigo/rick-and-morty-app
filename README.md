# Rick and Morty Character Comparator

A Next.js application for comparing Rick and Morty characters and their episodes using the Rick and Morty API.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Client State Management**: Zustand
- **Server State Management**: TanStack Query
- **Linting & formatting**: Biome
- **Testing**: Vitest & React Testing Library
- **Git Hooks**: Husky
- **Commit Conventions**: Conventional Commits

## 📋 Prerequisites

- Node.js 20 or higher
- pnpm 10.19.0 or higher

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/agustinmorinigo/rick-and-morty-app.git
   cd rick-and-morty-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, API routes)
├── client/           # API client configuration and services
├── components/       # Reusable UI components
├── constants/        # Application constants
├── domains/          # Business logic and domain-specific code
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── providers/        # React context providers
├── styles/           # Global styles and Tailwind configuration
└── types/            # TypeScript type definitions
```

### Key Directories

- **`app/`**: Contains all routes, layouts, and API endpoints following Next.js App Router convention
- **`components/`**: Shared UI components built with shadcn/ui
- **`domains/`**: Feature-specific business logic (character comparison, episode management)
- **`client/`**: API integration layer for Rick and Morty API
- **`hooks/`**: Global custom hooks

## 🧪 Available Scripts

```bash
# Development
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run start            # Start production server

# Code Quality
pnpm run lint             # Run Biome linter
pnpm run format           # Run Biome formatter
pnpm run check-types      # TypeScript type checking
pnpm run test             # Run tests with Vitest   
```

## 📝 Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Use the following format:

```
<type>: <description>
```

### Description rules

- Write the description in **imperative present tense**
- Start with a **lowercase letter**
- **Do not** end with a period
- Keep it **short and clear**

Think of it as:  
> *“This commit will…”*

#### ✅ Correct
- `add user authentication`
- `fix infinite loading state`
- `update installation instructions`

#### ❌ Incorrect
- `added user authentication`
- `fixes infinite loading state`
- `updating installation instructions`

### Allowed Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

### Examples
```bash
feat: add character comparison card
fix: resolve infinite loading state
docs: update installation instructions
```

## 🔧 Configuration Files

- **`biome.json`**: Linting and formatting configuration
- **`next.config.ts`**: Next.js configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`vitest.config.ts`**: Testing configuration
- **`commitlint.config.js`**: Commit message linting
- **`components.json`**: shadcn/ui configuration

## 🚨 Code Quality

The project enforces code quality through:

- **Biome**: Fast linting and formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks for pre-commit validation
- **lint-staged**: Runs checks on staged files only
- **Conventional Commits**: Standardized commit messages

## 🚀 Deployment

This project is deployed on **Vercel**.

Deployments are **automatic** on merge to the main branch, handled by Vercel.

For more details, see the official documentation:  
https://vercel.com/docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes using conventional commits
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request