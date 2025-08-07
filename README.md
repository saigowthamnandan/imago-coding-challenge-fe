# IMAGO Media Search - Frontend

This is the **Frontend** for the IMAGO Media Search application built using **Next.js**. It provides an interactive user interface to search, filter, sort, and paginate media items retrieved from the **FastAPI** backend.

---

## LIVE HOISTED URL

## Prerequisites

Before setting up the frontend, ensure you have the following installed:

- **Node.js**: Version 14 or higher.
- **npm**: Node package manager (comes with Node.js).
- **FastAPI Backend**: Ensure the backend is up and running. The frontend will communicate with the backend through API calls.

---

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/saigowthamnandan/imago-coding-challenge-fe.git
   cd imago-coding-challenge-fe
```

2. Install dependencies

```bash
npm i
# or
yarn i
# or
pnpm i
```

3. Configure environment variables: In the root of the project, create a .env file to define the API URL for the backend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

-- Ensure that NEXT_PUBLIC_API_URL matches the URL of the backend API (which by default is http://localhost:8000).

### Start the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be running at http://localhost:3000.

### Features & Functionalities

1. Search:
   Users can search media items based on a query string.

The search is case-insensitive and supports fuzzy matching.

2. Pagination:
   Results are displayed in a paginated format. Users can navigate between pages using the pagination controls.

3. Sorting:
   Results can be sorted by date, in either ascending or descending order.

4. Filters:
   Database Type (db): Filter media by the database type (e.g., stock, sport etc.).
   Date Range (datefrom, dateto): Filter media by date range.
   Photographer (fotografen): Filter media by complete photographer name.

5. Layout:
   Although there is support for both pagination and infinite scroll layouts, the infinite scroll feature is currently disabled due to access restrictions on the ELASTIC SEARCH scroll API for the user provided.

#### Layout Switching (Currently Disabled)

There is functionality in place for layout switching between:

Pagination layout: The default layout where media items are shown in a paginated format.

Infinite scroll: A layout where more results are fetched as the user scrolls down.

However, due to limitations with the user's access to the scroll API, infinite scroll is currently disabled.

#### Known Issues & Limitations

Infinite Scroll: The infinite scroll functionality is currently disabled due to access restrictions on the scroll API of the backend.

Performance: With large datasets, performance may degrade as all media items need to be loaded for pagination. Consider implementing lazy loading or deeper optimizations in the future.

#### Monitoring & Testing

**Monitoring**
Basic logging is available for tracking issues or errors.

A more sophisticated monitoring system and observability with OpenTelemetry, Jaeger, Prometheus, Grafana could be added for production use to track frontend errors.

**Testing**
Unit Testing: Use Jest for unit testing individual components.

Integration Testing: Use React Testing Library for testing interactions between components.
