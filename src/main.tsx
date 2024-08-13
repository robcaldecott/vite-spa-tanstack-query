// Font imports
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
// Main app CSS
import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLoading } from "./components/app-loading.tsx";
import { NotFound } from "./components/not-found.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/toaster.tsx";
import { Root } from "./routes/root.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_MSW === "true") {
    const { worker } = await import("./mocks/browser");
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

void enableMocking().then(() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          lazy: () => import("./routes/index.tsx"),
        },
        {
          path: "vehicles",
          lazy: () => import("./routes/vehicles.tsx"),
        },
        {
          path: "vehicles/:id",
          lazy: () => import("./routes/details.tsx"),
        },
        {
          path: "add",
          lazy: () => import("./routes/add.tsx"),
        },
      ],
    },
    {
      path: "login",
      lazy: () => import("./routes/login.tsx"),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} fallbackElement={<AppLoading />} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
