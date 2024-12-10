export type UserType = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (newValue: boolean) => void;
  user: UserType | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>;
};

export type UserResponseType = {
  data: UserType;
  status: boolean;
  msg: string;
};
