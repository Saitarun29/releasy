# Contributing to Releasy

Thank you for considering contributing to Releasy. This project is open source and welcomes contributions of all kinds.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork
3. **Install** dependencies with `npm install`
4. **Copy** environment variables: `cp .env.example .env.local`
5. **Add** your Mistral AI API key to `.env.local`
6. **Run** the development server: `npm run dev`

## Development Workflow

1. Create a branch from `main`: `git checkout -b feature/your-feature`
2. Make your changes
3. Run `npm run lint` to check for errors
4. Run `npm run build` to verify the production build compiles
5. Commit with clear messages
6. Push and open a pull request

## Code Style

- **TypeScript** — Strict mode. Avoid `any`. Prefer explicit interfaces over inline types.
- **Components** — Use `"use client"` only if the component needs interactivity (state, effects, event handlers).
- **Imports** — Group: React/Next.js → third-party libraries → local modules. Use `@/` path aliases.
- **Formatting** — Run `npm run lint` before committing.
- **Error handling** — Use the custom error classes (`GitHubError`, `AiError`) for domain-specific errors.

## Project Structure

```
app/           Next.js App Router pages and API routes
components/   React components (UI + feature)
docs/         Architecture and design documentation
lib/          Business logic (API clients, prompts, utilities)
types/        TypeScript type definitions
constants/   Application constants and configuration
```

## Pull Request Guidelines

- Keep PRs focused on a single change
- Reference any related issues
- Include screenshots for UI changes
- Ensure both `lint` and `build` pass with zero errors

## Reporting Issues

Open an issue with:
- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.
