import { useCallback, useState } from "react";
import s from "./rootHeader.module.css";
import { LOGOUT_URL } from "../../constants/ApiEndpoints";
import { useMutation } from "../../hooks/useMutation";
import { useAuthContext } from "../../providers/AuthProvider";

const RootHeader = () => {
  const { setIsLoggedIn, setUser } = useAuthContext();
  const [logoutUser, { isLoading: isLogoutLoading }] = useMutation(
    LOGOUT_URL,
    "POST"
  );

  // logout user
  const handleLogoutUser = useCallback(async () => {
    const { isError } = await logoutUser({});
    if (isError) return;
    setIsLoggedIn(false);
    setUser(null);
  }, [logoutUser, setIsLoggedIn, setUser]);

  return (
    <div className={s.root_header}>
      <button onClick={handleLogoutUser} type="button">
        {isLogoutLoading ? "...Logging out" : "Logout"}
      </button>
    </div>
  );
};

export default RootHeader;
