# AI Code Review Application

A full-stack code review application built with Vue, Express, TypeScript, and Zod. A user can submit source code, choose its language and the type of review they want, and receive a structured review containing a score, summary, and list of issues.

## Current Status

This project is a work in progress.

The Vue-to-Express request flow is working, request and response contracts are shared across the workspace, and both sides handle loading, validation, and error states. The backend currently returns a mocked review result from `reviewService.ts`.

The Dahl API request, PostgreSQL persistence, automated tests, final styling, Monaco Editor, and local-LLM support are not implemented yet.

## Current Features

- Multiline code input.
- Coding-language selection.
- Review-type selection.
- Client-side checks for missing form values.
- Loading and error states while a review is requested.
- Typed `POST /api/reviews` requests.
- Server-side request validation with Zod.
- Structured review results with a score, summary, and issues.
- Server-side validation of review results.
- Shared TypeScript types, Zod schemas, and selector constants.
- Fail-fast server environment validation.
- Consistent JSON error responses from the backend.

## Supported Options

### Languages

- Python
- JavaScript
- TypeScript
- C#
- Java

### Review Types

- All
- Correctness
- Security
- Performance
- Readability

### Issue Severities

- `low`
- `medium`
- `high`
- `critical`

## Tech Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- Native Fetch API
- ESLint, Oxlint, and Prettier

### Backend

- Node.js
- Express 5
- TypeScript
- Zod
- dotenv
- CORS
- tsx

### Shared Contracts

- TypeScript types shared by the client and server
- Zod request and response schemas
- Shared language, review-type, and severity constants

### Planned Integrations

- Dahl inference API for AI-generated reviews
- PostgreSQL for review history and issue persistence
- LM Studio as an optional local-LLM provider
- Monaco Editor for a richer code-editing experience

## Repository Structure

The repository is an npm workspace with three packages and one root lockfile:

```text
AI-Code-Review/
├── client/
│   └── src/
│       ├── components/
│       │   ├── CodeInput.vue
│       │   ├── LangSelector.vue
│       │   ├── ReviewResults.vue
│       │   └── TypeSelector.vue
│       └── App.vue
├── server/
│   └── src/
│       ├── routes/
│       │   └── reviewRoutes.ts
│       ├── services/
│       │   └── reviewService.ts
│       ├── config.ts
│       └── index.ts
├── shared/
│   └── src/
│       ├── index.ts
│       ├── reviewRequest.ts
│       └── reviewResult.ts
├── package.json
└── package-lock.json
```

- `client` contains the Vue frontend.
- `server` contains the Express API and review service.
- `shared` is exposed as `@ai-code-review/contracts` and is consumed by both applications.

## Current Request Flow

```text
User completes the Vue form
        ↓
App.vue sends POST /api/reviews
        ↓
Express parses the JSON request body
        ↓
reviewRequestSchema validates the request
        ↓
reviewService returns and validates a mocked result
        ↓
Express returns the structured JSON response
        ↓
ReviewResults.vue renders the result
```

When the Dahl integration is complete, the mocked section in `reviewService.ts` will be replaced by an authenticated API request, JSON parsing, and validation of the model response with `reviewResultSchema`.

## Shared Contracts

The `@ai-code-review/contracts` workspace package is the source of truth for data that crosses the client-server boundary.

### Review Request

```ts
type ReviewRequest = {
  code: string;
  language: "Python" | "JavaScript" | "TypeScript" | "C#" | "Java";
  reviewType:
    "All" | "Correctness" | "Security" | "Performance" | "Readability";
};
```

The request schema rejects blank or whitespace-only code and rejects language or review-type values outside the supported lists.

### Review Result

```ts
type ReviewResult = {
  score: number;
  summary: string;
  issues: ReviewIssue[];
};

type ReviewIssue = {
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  explanation: string;
  suggestedFix: string;
  lineNumber: number | null;
};
```

The response schema requires a score between `0` and `100`, non-empty issue text, and a positive integer or `null` for each line number.

## API

### `POST /api/reviews`

Validates a code-review request and returns a structured review.

#### Example Request

```json
{
  "code": "const add = (a, b) => a + b;",
  "language": "JavaScript",
  "reviewType": "All"
}
```

#### Example Success Response

The current response is mocked by `reviewService.ts`:

```json
{
  "score": 88,
  "summary": "Good enough",
  "issues": [
    {
      "severity": "low",
      "title": "Issues title text",
      "explanation": "explanation",
      "suggestedFix": "suggested fix text",
      "lineNumber": null
    }
  ]
}
```

#### Invalid Request — `400`

```json
{
  "error": "Invalid review request",
  "details": {
    "formErrors": [],
    "fieldErrors": {
      "code": ["Invalid input"]
    }
  }
}
```

The exact contents of `details` depend on which request fields failed validation.

#### Review Service Failure — `502`

```json
{
  "error": "Code review service failed."
}
```

The backend logs the original service error but returns a generic message to the client.

## Environment Variables

Create `server/.env` from `server/.env.example`. The real `.env` file is ignored by Git.

| Variable       | Required now | Purpose                                                                                                |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| `PORT`         | No           | Express TCP port. Defaults to `8080` when omitted. Use `3000` with the current frontend configuration. |
| `LLM_API_KEY`  | Yes          | Secret Dahl API key. Keep this on the server only.                                                     |
| `LLM_BASE_URL` | Yes          | Base URL for the inference API. The example uses `https://inference.dahl.global/v1`.                   |
| `LLM_MODEL`    | Yes          | Model identifier sent to the inference API.                                                            |
| `DB_HOST`      | No           | Reserved for the planned PostgreSQL integration.                                                       |
| `DB_PORT`      | No           | Reserved for the planned PostgreSQL integration.                                                       |
| `DB_USER`      | No           | Reserved for the planned PostgreSQL integration.                                                       |
| `DB_PASSWORD`  | No           | Reserved for the planned PostgreSQL integration.                                                       |
| `DB_NAME`      | No           | Reserved for the planned PostgreSQL integration.                                                       |

Although the Dahl request is not implemented yet, its three `LLM_*` variables are already required by the server configuration schema.

`server/src/config.ts` loads the environment, validates it with Zod, converts `PORT` to a number, and exports a typed configuration object. Invalid required values prevent the server from starting.

Never put the Dahl API key in frontend code, commit it to Git, or include it in logs.

## Running the Project

### Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- npm
- A Dahl API key for the current server configuration

PostgreSQL is not required yet because persistence has not been implemented.

### 1. Install Dependencies

From the repository root:

```bash
npm install
```

npm installs all three workspaces and updates the single root `package-lock.json`. Separate installations inside `client`, `server`, and `shared` are unnecessary.

### 2. Create the Server Environment File

PowerShell:

```powershell
Copy-Item server/.env.example server/.env
```

Bash:

```bash
cp server/.env.example server/.env
```

Fill in `LLM_API_KEY`. Review the provided base URL and model before starting the server. Keep `PORT=3000` while the client API URL remains hardcoded to port `3000`.

### 3. Start the Backend

Open a terminal in `server`:

```bash
cd server
npm run dev
```

With the example configuration, the API runs at `http://localhost:3000`.

### 4. Start the Frontend

Open another terminal in `client`:

```bash
cd client
npm run dev
```

Vite serves the frontend at `http://localhost:5173` by default. The backend currently allows CORS requests from that exact origin.

### 5. Try the Current Flow

Enter code, select a language and review type, and click **Review Code**. The request reaches Express and returns the mocked review result shown above.

## Available Commands

### Client

Run these commands from `client`:

| Command              | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Start the Vite development server.                     |
| `npm run build`      | Type-check and build the production client.            |
| `npm run build-only` | Build without running the separate type-check command. |
| `npm run type-check` | Run Vue and TypeScript type checking.                  |
| `npm run lint`       | Run Oxlint and ESLint with automatic fixes.            |
| `npm run format`     | Format the client source with Prettier.                |
| `npm run preview`    | Preview the production build locally.                  |

### Server

Run these commands from `server`:

| Command       | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| `npm run dev` | Start the server in watch mode.                         |
| `npm start`   | Start the server once with tsx.                         |
| `npm test`    | Placeholder only; server tests have not been added yet. |

The root and shared workspace do not currently define development scripts.

## Error Handling

- Missing frontend form values are rejected before the request is sent.
- Invalid request bodies receive a `400` response with Zod validation details.
- Review-service failures receive a generic `502` response.
- Network failures are displayed by the frontend as `Could not complete the review request.`
- Invalid review results cause the service to throw instead of returning malformed data.
- Invalid server environment variables prevent Express from starting.

## Current Limitations

- `reviewService.ts` ignores the submitted request and returns fixed mock data.
- No request is sent to Dahl yet.
- The frontend API URL is hardcoded to `http://localhost:3000`.
- The allowed CORS origin is hardcoded to `http://localhost:5173`.
- PostgreSQL is not connected and no data is persisted.
- There is no review-history endpoint or UI.
- There are no automated client or server tests.
- The UI has only browser-default styling.
- The code input is a standard `<textarea>`, not Monaco Editor.
- Local-LLM support through LM Studio is only planned.

## V1 — Definition of Done

### Project Setup

- [x] Create Git repository
- [x] Create `client`, `server`, and `shared` workspaces
- [x] Create Vue + TypeScript frontend
- [x] Create Express + TypeScript backend
- [x] Configure `.gitignore`
- [x] Configure and validate environment variables
- [x] Create shared request and response contracts

### Frontend

- [x] Create code input
- [x] Create language selection
- [x] Create review type selection
- [x] Create Review Code button
- [x] Store form values using Vue state
- [x] Send review request to backend
- [x] Show loading state while review is running
- [x] Show errors when a request fails
- [x] Display review result
- [x] Display individual review issues

### Backend

- [x] Start Express server
- [x] Create `POST /api/reviews`
- [x] Receive code, language, and review type
- [x] Validate request body with Zod
- [x] Create review service with a mock result
- [ ] Build code-review prompt
- [ ] Send request to Dahl API
- [ ] Receive AI response
- [ ] Parse AI response
- [x] Validate review response with Zod
- [x] Return structured review to frontend

### AI Response Contract

- [x] Include a review score
- [x] Include a review summary
- [x] Include a list of issues
- [x] Include severity for each issue
- [x] Include a title for each issue
- [x] Include an explanation for each issue
- [x] Include a suggested fix for each issue
- [x] Support line numbers when available

### PostgreSQL

- [ ] Connect Express to PostgreSQL
- [ ] Create `reviews` table
- [ ] Create `review_issues` table
- [ ] Save completed reviews
- [ ] Save review issues
- [ ] Create endpoint for review history
- [ ] Display previous reviews in frontend

### Quality and Final V1

- [ ] Add automated server tests
- [ ] Add automated client tests
- [ ] Test complete Vue → Express → Dahl flow
- [ ] Test database persistence
- [x] Handle invalid review responses
- [x] Handle backend errors
- [ ] Add final UI styling
- [ ] Add an option to replace Dahl with a local LLM through LM Studio
- [ ] Test the complete application with a local LLM

## Planned Implementation Order

1. Build a deterministic code-review prompt from `ReviewRequest`.
2. Send the request to Dahl from `reviewService.ts` using the server-only configuration.
3. Check Dahl HTTP errors and safely extract the assistant message.
4. Parse the assistant message as JSON.
5. Validate the parsed value with `reviewResultSchema`.
6. Manually test the complete Vue → Express → Dahl flow.
7. Add PostgreSQL persistence and review history.
8. Add automated tests.
9. Complete styling, Monaco Editor, and optional local-LLM support.
