import { Link, useMatch } from "react-router-dom";
import s from "./authHeader.module.css";
import { APP_ENDPOINTS } from "../../constants/AppEndpoints";

const AuthHeader = () => {
  const isLoginPage = useMatch(APP_ENDPOINTS.AUTH);
  return (
    <div className={s.auth_header}>
      <Link
        to={
          isLoginPage ? `${APP_ENDPOINTS.REGISTER}` : `/${APP_ENDPOINTS.AUTH}`
        }
      >
        {isLoginPage ? "Register" : "Login"}
      </Link>
    </div>
  );
};

export default AuthHeader;
