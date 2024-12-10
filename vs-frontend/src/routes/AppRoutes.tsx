import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { APP_ENDPOINTS } from "../constants/AppEndpoints";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import { AuthProvider } from "../providers/AuthProvider";
import ProtectRoute from "./ProtectRoute";
import Home from "../pages/root/home/Home";
import { AnalyticsProvider } from "../providers/AnalyticsProvider";
import Feature from "../pages/root/feature/Feature";

const router = createBrowserRouter([
  {
    path: APP_ENDPOINTS.ROOT,
    element: (
      <ProtectRoute>
        <RootLayout />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: APP_ENDPOINTS.FEATURE, element: <Feature /> },
    ],
  },
  {
    path: APP_ENDPOINTS.AUTH,
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: APP_ENDPOINTS.REGISTER, element: <Register /> },
    ],
  },
]);

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <RouterProvider router={router} />
      </AnalyticsProvider>
    </AuthProvider>
  );
};
