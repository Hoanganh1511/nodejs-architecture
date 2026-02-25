# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Run the server (node server.js), listens on port 8000
```

No test runner or linter is configured yet.

## Architecture

This is a layered Express 5 application. The two entry points are strictly separated:

- **`server.js`** — network layer only: creates the HTTP server, binds port 8000, handles `SIGINT` for graceful shutdown.
- **`src/app.js`** — Express app configuration: registers middleware, mounts routes, and handles errors. Exported as a module so it can be tested independently of the network.

### Intended folder structure under `src/`

| Directory | Purpose |
|---|---|
| `configs/` | App-level configuration (DB connections, env parsing, etc.) |
| `controllers/` | Route handler functions |
| `models/` | Data models / DB schemas |
| `services/` | Business logic, decoupled from HTTP layer |
| `utils/` | Shared utility helpers |

All four directories currently exist but are empty — the project is in early scaffolding stage.

### Notes

- `morgan` is listed under `devDependencies` but is `require()`-d in `src/app.js` (used in all environments). Move it to `dependencies` if production logging is needed.
- Port is hardcoded to `8000` in `server.js`; a future step is to read it from `process.env.PORT`.
