import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuardedRoute from "./components/gaurdedRoute";
import App from "./App.tsx";
import Login from "./pages/login/index.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuardedRoute />,
    children: [{ path: "/", element: <App /> }],
  },
  { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="448857575639-91l2ec768flvk78gbhn3delrfo0o4596.apps.googleusercontent.com">
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>
);
