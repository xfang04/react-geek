import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute children={<Layout />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
