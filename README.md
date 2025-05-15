# Task Management Dashboard

A modern Kanban-style task management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- View tasks in a Kanban-style board
- Create new tasks with title, description, and status
- Drag and drop tasks between columns
- Persistent storage using a mock REST API
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- react-beautiful-dnd (for drag and drop)
- json-server (for mock API)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kanban-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API server:

```bash
npx json-server --watch db.json --port 3001
```

4. In a new terminal, start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
src/
  ├── components/
  │   ├── Board.tsx
  │   ├── Column.tsx
  │   ├── TaskCard.tsx
  │   └── AddTaskModal.tsx
  ├── services/
  │   └── api.ts
  ├── types/
  │   └── index.ts
  ├── App.tsx
  └── index.tsx
```

## API Endpoints

The mock API provides the following endpoints:

- GET /tasks - Get all tasks
- POST /tasks - Create a new task
- PATCH /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
