# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run all commands from the repository root (this is where `package.json` and `node_modules` live, even though the source code is under `backend/`):

- `npm run dev` — start the backend with nodemon (auto-restarts on file changes)
- `npm start` — start the backend once with plain `node`

There is no test suite, lint config, or build step configured yet.

## Environment

A `.env` file at the repo root (loaded via `dotenv` in `backend/src/server.js`) provides:
- `MONGODB_URI` — MongoDB Atlas connection string
- `PORT` — HTTP port (defaults to 5000 if unset)

If MongoDB connection fails with a server-selection/timeout error, it's almost always the Atlas Network Access IP allowlist rejecting the current IP, not a code issue.

## Architecture

This is an Express + Mongoose API. The `frontend/` directory exists but is currently empty — only the backend is implemented so far.

Request flow: `server.js` → mounts feature routers under `/api/<resource>` → router maps HTTP verbs to controller functions → controller calls the Mongoose model.

Current wiring for the expense resource:
- [backend/src/server.js](backend/src/server.js) — Express app setup; calls `connectDB()` on startup and mounts `expenseRoutes` at `/api/expenses`.
- [backend/src/config/db.js](backend/src/config/db.js) — `connectDB()` connects Mongoose to `MONGODB_URI`; calls `process.exit(1)` on failure (so a bad connection string or IP block crashes the process rather than running degraded).
- [backend/src/routes/Expenseroute.js](backend/src/routes/Expenseroute.js) — defines `POST /create`, `GET /`, `GET /:expenseId`.
- [backend/src/controllers/Expense.controller.js](backend/src/controllers/Expense.controller.js) — `createExpense`, `getAllExpenses`, `getExpenseById`. All handlers wrap DB calls in try/catch and return a consistent `{ success, message, data }` shape (201/200 on success, 500 on error; `getExpenseById` returns 404 when not found).
- [backend/src/models/expense.js](backend/src/models/expense.js) — Mongoose schema for expenses.
- [backend/src/models/Counter.js](backend/src/models/Counter.js) — backs a human-readable sequential ID scheme.

### Sequential `expenseId` pattern

MongoDB has no built-in auto-increment, so human-readable IDs (`EXP001`, `EXP002`, ...) are generated via a separate `counters` collection ([Counter.js](backend/src/models/Counter.js)). `generateExpenseId()` in the controller does an atomic `findOneAndUpdate({ name: "expenseId" }, { $inc: { seq: 1 } }, { upsert: true, new: true })` to avoid race conditions under concurrent requests, then formats the result as `EXP` + zero-padded number. Any new resource that needs the same pattern should add its own counter document (distinct `name`) rather than reusing `"expenseId"`.

The Mongoose document's real `_id` (ObjectId) is still stored and used internally, but the schema's `toJSON.transform` strips `_id` and `__v` from anything serialized via `res.json()` — `expenseId` is the externally-facing identifier.

### Module system and file naming

The project uses native ESM (`"type": "module"` in `package.json`): imports must use `import`/`export` and include file extensions (`./file.js`, not `./file`). Import paths are also case-sensitive at the ESM resolver level even though the local Windows filesystem is not — a path that only differs in case from the real filename will fail to resolve. File naming casing is inconsistent across the codebase (e.g. `models/expense.js` lowercase, `models/Counter.js` PascalCase, `controllers/Expense.controller.js` dotted, `routes/Expenseroute.js` one word) — when adding imports, match the existing filename's casing exactly rather than assuming a convention.

### Schema changes don't retroact

Changing a Mongoose schema only affects how new documents are validated/created going forward. Documents already persisted in MongoDB keep whatever fields they were saved with; a schema/field rename requires an explicit migration (e.g. `updateMany`) to backfill existing documents.
