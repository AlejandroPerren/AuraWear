import { createHashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./views/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./views/AuthPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Suspense } from "react";
import Loading from "./views/utils/Loading";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading/>}>
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [{ index: true, element:(
      <Suspense fallback={<Loading/>}>
      <ProtectedRoute>
        <AuthPage />
      </ProtectedRoute>
    </Suspense>
    ) }],
  },
]);
