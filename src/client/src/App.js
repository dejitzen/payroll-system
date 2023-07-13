import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./Screens/Auth/Login/Login";
import { useAtom } from "jotai";
import { loggedInAtom } from "./utils/atoms";
import Redirector from "./Screens/Redirector/Redirector";
import Dashboard from "./Screens/Dashboard/Dashboard";
import Stats from "./Screens/Stats/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirector />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
export default App