import { useCallback, useState } from "react";
import { REGISTER_URL } from "../../../constants/ApiEndpoints";
import s from "./register.module.css";
import { useMutation } from "../../../hooks/useMutation";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { APP_ENDPOINTS } from "../../../constants/AppEndpoints";
import type { UserResponseType } from "../../../types/Provider/authProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { data, isLoading: isRegisterLoading }] =
    useMutation<UserResponseType>(REGISTER_URL, "POST");
  const { setIsLoggedIn, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { isError } = await registerUser({ email, password });

      if (isError) return;
      setIsLoggedIn(true);
      setUser(data?.data);
      navigate(APP_ENDPOINTS.ROOT);
    },
    [email, password, registerUser, data, setIsLoggedIn, setUser, navigate]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.register}>
        <h1 className={s.title}>Register</h1>
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
          disabled={isRegisterLoading}
        >
          {isRegisterLoading ? "...Loading" : "Register"}
        </button>
      </div>
    </form>
  );
};

export default Register;
