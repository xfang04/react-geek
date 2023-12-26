import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute children={<Layout />} />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
