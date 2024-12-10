import { useCallback, useState } from "react";
import s from "./login.module.css";
import { useMutation } from "../../../hooks/useMutation";
import { LOGIN_URL } from "../../../constants/ApiEndpoints";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { APP_ENDPOINTS } from "../../../constants/AppEndpoints";
import type { UserResponseType } from "../../../types/Provider/authProvider";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, isLoading: isLoginLoading }] =
    useMutation<UserResponseType>(LOGIN_URL, "POST");
  const { setIsLoggedIn, setUser } = useAuthContext();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { isError } = await loginUser({ email, password });

      if (isError) return;
      setIsLoggedIn(true);
      setUser(data?.data);
      navigate(APP_ENDPOINTS.ROOT);
    },
    [email, password, loginUser, navigate, setIsLoggedIn, setUser, data]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.login}>
        <h1 className={s.title}>Login</h1>
        <div className={s.field_wrapper}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={s.field_wrapper}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={s.submit_btn}
          disabled={isLoginLoading}
        >
          {isLoginLoading ? "...Loading" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
