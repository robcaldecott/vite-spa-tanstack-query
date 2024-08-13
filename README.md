# Classic SPA built using Vite + TanStack React Query

This is a statically built SPA that can be deployed without requiring a Node app server. The aim is to build a CRUD-style application using out-of-the-box React Router and `@tanstack/react-query` features.

Highlights:

- Uses React Router DOM for client-side routing.
- Uses `@tanstack/react-query` for API queries and mutations.
- UI components built using `shadcn/ui` and Radix.
- Includes a Dashboard, a vehicles table (supporting pagination and filtering), vehicle details (including the ability to delete a vehicle) and a form that lets you add new vehicles to the inventory.
- Support for light and dark mode.
- API mocking in dev mode using `msw`.
- Full set of Playwright tests.
- Storybook.

Note that this app is not fully complete and the UX still has plenty of room for improvement. The main addition would probably be a form management library like `react-hook-form` to allow for better client-side validation (such as `onBlur`.)

## Getting started

Run the app in dev mode with a mocked API:

```bash
npm run dev
```

Then point your browser at http://localhost:5173 to see the app in action.

## Notes on the developer experience

In no particular order.

- Data is fectched at the route level when the page components are rendered. In some cases multiple API calls are combined in a single query to make the loading and error states easier to handle. You need to be careful here as these combined queries will be cached using a single query key but it is less work that `useQueries`.
- Adding loading skeletons and error handling on every page can soon get repetitive. If the API is fast then there is a flicker of the loading skeleton before the data arrives.
- Vite uses `react-refresh` and this can cause `eslint` warnings when exporting plain functions from the same file as React components. At least one component (`button.tsx`) required the `cva` styles to be moved to a separate file to keep `eslint` happy which is a little annoying.
- Some routes are private so we need to check for a session cookie before they render, redirecting to the login page if the cookie is missing. At the moment each private route is wrapped in a `<PrivateRoute />` component to achieve this but there might be a better way to do this. Note that in a real app we would also want to intercept API calls to look for authentication errros using tooling such as `axios` interceptors (although `ky` can probably manage this and is a much smaller package.)
- Lazy loading of routes is achieved using `lazy` directly in the router config.
- Query and mutation types are pretty good thanks to `@tanstack/react-query`. In a real app we would probably be generating the API types from the OA3 spec, and tools exist that can geneerate a set of custom hooks (although I personally would prefer to use a query object factory instead.)
- Given the app shows off a dashboard, a table with pagination/filtering, a details page with a delete option and a form to add a new vehicle, there is only one `useEffect` hook and three `useState` hooks in the entire app.
- The default Vite `eslint` config is too simple and requires some effort to address.
- Vite uses separate Typescript config files for app-related code and node-related code. This feels like overkill and ensuring config files for other tools lint correctly can be frustrating.
