import { createHashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./views/home/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Suspense } from "react";
import Loading from "./views/utils/Loading";
import AdminLayout from "./layouts/AdminLayout";
import AdminMainPage from "./views/admin/AdminMainPage";
import AuthPage from "./views/auth/AuthPage";
import UserLayout from "./layouts/UserLayout";
import UsersPage from "./views/users/UsersMainPage";
import CreateProduct from "./views/admin/CreateProduct";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
              <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <AdminMainPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "crear-Producto",
        element: (
          <Suspense fallback={<Loading/>}>
            <ProtectedRoute>
              <CreateProduct/>
            </ProtectedRoute>
          </Suspense>
        )
      },
    ],
  },
  {
    path: "users",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
