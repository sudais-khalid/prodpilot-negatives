# Contributing to VoltFit

Thanks for helping improve this open-source dashboard UI.

## Quick start

```bash
npm install
npm run dev
```

## Development guidelines

- Keep dashboard modules **prop-free**. Shared mock/API data lives in `src/data/dashboard.js`.
- Prefer small, focused components under `src/components/` and page shells under `src/pages/`.
- Match the existing visual language (spacing, rounded cards, accent colors in `tailwind.config.js` / `src/index.css`).
- Run `npm run build` before opening a PR to confirm the production build succeeds.

## Pull requests

1. Fork the repository
2. Create a branch from `main` (`feat/...`, `fix/...`, or `docs/...`)
3. Make your changes with a clear commit message
4. Open a pull request describing what changed and why

## Reporting issues

Use GitHub Issues for bugs or feature requests. Include steps to reproduce when reporting a bug.
