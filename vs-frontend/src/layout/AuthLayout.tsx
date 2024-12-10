import { Outlet } from "react-router-dom";
import AuthHeader from "../components/authHeader/AuthHeader";

const AuthLayout = () => {
  return (
    <div className="layout">
      <AuthHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
