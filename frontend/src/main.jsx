import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import "./index.css";
import ListDetails from "./pages/ListDetails.jsx";

const router = createBrowserRouter([
    { path: "/", exact: true, element: <App /> },
    { path: "/list/:id", exact: true, element: <ListDetails /> },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
