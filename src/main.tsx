import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuardedRoute from "./components/gaurdedRoute";
import App from "./App.tsx";
import Login from "./pages/login/index.tsx";
import Upload from "./pages/upload/index.tsx";
import NotFound from "./pages/notFound.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuardedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Upload />,
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="448857575639-91l2ec768flvk78gbhn3delrfo0o4596.apps.googleusercontent.com">
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>
);
