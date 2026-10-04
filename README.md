# AI Code Review Application

## Project Overview

### Description

### Goal

## Tech Stack

### Frontend

### Backend

### Database

### AI

## Architecture

The repository is an npm workspace with three packages:

- `client` contains the Vue frontend.
- `server` contains the Express backend.
- `shared` exposes the request and response contracts used by both applications through `@ai-code-review/contracts`.

## API

### Review Endpoint

## Database

### Reviews

### Review Issues

## Environment Variables

## Running the Project

### First-time Setup

After cloning the repository, open a terminal in the project root and install all workspace dependencies:

```bash
npm install
```

Run workspace installations from the project root. npm installs the client, server and shared contracts package together and creates one root `package-lock.json`.

### Frontend

Open a terminal in `client` and start the Vue development server:

```bash
cd client
npm run dev
```

The client runs at `http://localhost:5173` by default.

### Backend

Open a second terminal in `server` and start the Express development server:

```bash
cd server
npm run dev
```

The backend uses the `PORT` environment variable. If `PORT` is absent, it defaults to `8080`. Both servers need to be running while developing the application.

## V1 - Definition of Done

### Project Setup

- [x] Create Git repository
- [x] Create `client` and `server` folders
- [x] Create Vue + TypeScript frontend
- [x] Create Express + TypeScript backend
- [x] Configure `.gitignore`
- [x] Configure environment variables

### Frontend

- [x] Create code input
- [x] Create language selection
- [x] Create review type selection
- [x] Create Review Code button
- [x] Store form values using Vue state
- [x] Send review request to backend
- [x] Show loading state while review is running
- [x] Show errors when a request fails
- [x] Display AI review result
- [x] Display individual review issues

### Backend

- [x] Start Express server
- [x] Create `POST /api/reviews`
- [x] Receive code, language and review type
- [x] Validate request body with Zod
- [x] Create AI service
- [ ] Build code-review prompt
- [ ] Send request to Dahl API
- [ ] Receive AI response
- [ ] Parse AI response
- [x] Validate AI response with Zod
- [x] Return structured review to frontend

### AI Response

- [x] Return a review score
- [x] Return a review summary
- [x] Return a list of issues
- [x] Each issue contains severity
- [x] Each issue contains title
- [x] Each issue contains explanation
- [x] Each issue contains suggested fix
- [x] Support line numbers when available

### PostgreSQL

- [ ] Connect Express to PostgreSQL
- [ ] Create `reviews` table
- [ ] Create `review_issues` table
- [ ] Save completed reviews
- [ ] Save review issues
- [ ] Create endpoint for review history
- [ ] Display previous reviews in frontend

### Final V1

- [ ] Test complete Vue → Express → AI flow
- [ ] Test database persistence
- [x] Handle invalid AI responses
- [x] Handle backend errors
- [ ] Add final UI styling
- [ ] Have option to replace Dahl API with local LLM through LM Studio
- [ ] Test complete application with local LLM

### Monaco Editor
