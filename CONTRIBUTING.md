# Contributing to Releasy

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. Fork and clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Mistral AI API key
4. Run `npm run dev` to start the development server

## Code Style

- TypeScript strict mode is enabled
- Run `npm run lint` before committing
- Run `npm run build` to verify the production build

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — React components
- `lib/` — Business logic (GitHub API, Mistral AI, prompts, utilities)
- `types/` — TypeScript type definitions
- `constants/` — Configuration and label constants

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run build` — both must pass with zero errors
4. Submit a PR with a clear description of the change

## Reporting Issues

Open an issue with:
- A clear title and description
- Steps to reproduce (if a bug)
- Expected vs actual behavior
- Screenshots if applicable
