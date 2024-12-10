import { noop } from "../Misc";

export const DEFAULT_AUTH_CONTEXT_VALUES = {
  isLoggedIn: false,
  setIsLoggedIn: noop,
  user: null,
  setUser: noop,
};
