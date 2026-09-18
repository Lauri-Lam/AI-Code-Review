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

## API

### Review Endpoint

## Database

### Reviews

### Review Issues

## Environment Variables

## Running the Project

### First-time Setup

After cloning the repository, open a terminal in the project root and install the dependencies for each application:

```bash
cd client
npm install

cd ../server
npm install
```

The client and server have separate `package.json` files, so each folder must be installed independently.

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

The backend runs at `http://localhost:3000` by default. Both servers need to be running while developing the application.

## V1 - Definition of Done

### Project Setup

- [x] Create Git repository
- [x] Create `client` and `server` folders
- [x] Create Vue + TypeScript frontend
- [x] Create Express + TypeScript backend
- [x] Configure `.gitignore`
- [x] Configure environment variables

### Frontend

- [ ] Create code input
- [ ] Create language selection
- [ ] Create review type selection
- [ ] Create Review Code button
- [ ] Store form values using Vue state
- [ ] Send review request to backend
- [ ] Show loading state while review is running
- [ ] Show errors when a request fails
- [ ] Display AI review result
- [ ] Display individual review issues

### Backend

- [x] Start Express server
- [x] Create `POST /api/reviews`
- [x] Receive code, language and review type
- [x] Validate request body with Zod
- [ ] Create AI service
- [ ] Build code-review prompt
- [ ] Send request to Dahl API
- [ ] Receive AI response
- [ ] Parse AI response
- [ ] Validate AI response with Zod
- [x] Return structured review to frontend

### AI Response

- [ ] Return a review score
- [ ] Return a review summary
- [ ] Return a list of issues
- [ ] Each issue contains severity
- [ ] Each issue contains title
- [ ] Each issue contains explanation
- [ ] Each issue contains suggested fix
- [ ] Support line numbers when available

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
- [ ] Handle invalid AI responses
- [ ] Handle backend errors
- [ ] Add final UI styling
- [ ] Replace Dahl API with local Qwen through LM Studio
- [ ] Test complete application with local Qwen

## Future Improvements

### GitHub Integration

### Pull Request Reviews

### Diff Reviews

### Monaco Editor

### Streaming Responses

### Authentication
