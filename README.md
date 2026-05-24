# ⚡ Superpower Shop

## Overview
Superpower Shop is a React-based e-commerce admin portal for managing and browsing superpowers. Built as a single-page application (SPA) using React, React Router v6, and a JSON Server backend, it demonstrates advanced React concepts including custom hooks, context API, client-side routing, and full CRUD operations.

## Screenshot

![App Screenshot](./screenshot.png)

## Setup

Clone the repository and install dependencies:

```bash
npm install
```

Start the backend (runs on port 6001):

```bash
npm run server
```

Start the frontend (runs on port 5173):

```bash
npm run dev
```

Run the test suite:

```bash
npm run test
```

## Features

- **Browse Superpowers** — View all available superpowers with stock status and pricing
- **Search** — Filter superpowers by name in real time
- **View Detail** — Click any superpower for a full hyped-up detail page
- **Add a Superpower** — Submit a form to POST a new superpower to the backend
- **Admin Edit** — Update price and stock availability via PATCH request
- **Delete** — Remove a superpower from the shop and backend via DELETE request

## Routes

| Route | Page |
|---|---|
| `/` | Home / Landing page |
| `/superpowers` | Shop — browse all superpowers |
| `/superpowers/new` | Add a new superpower |
| `/superpowers/:id` | Detail view for a specific superpower |
| `/superpowers/:id/edit` | Admin edit page |
| `/about` | About the store |

## Hooks Used

| Hook | Location | Purpose |
|---|---|---|
| `useState` | Throughout | Local state management |
| `useEffect` | Context, Detail | Data fetching and side effects |
| `useContext` | All pages | Access global superpower state |
| `useRef` | SuperpowerList | Persist search value without re-render |
| `useId` | AddSuperpower | Generate unique accessible form IDs |
| `useNavigate` | Forms | Programmatic navigation after submit |
| `useParams` | Detail, Edit | Read URL parameters |
| `useLocalStorage` | Custom hook | Persist data to browser localStorage |

## CRUD Operations

- **GET** — Fetch all superpowers on app load via `useEffect`
- **POST** — Add a new superpower via the Add Power form
- **PATCH** — Update price and stock status via the Admin Edit page
- **DELETE** — Remove a superpower via the Delete button on each card

## Testing

12 tests across 3 suites covering all major features:

- `DisplayPowers.test.jsx` — Verifies superpowers load and render correctly
- `CrudPowers.test.jsx` — Verifies POST, PATCH, and DELETE operations
- `SearchPowers.test.jsx` — Verifies search filtering behavior

## Tech Stack

- React 19
- React Router v6
- Vite
- JSON Server
- Vitest + React Testing Library

## Submission
Push to GitHub and submit the repository link through Canvas.