import { createContext } from "react";

export const userContext = createContext({
  user: {
    email: "",
    uid: "",
  },
  isSignIn: false,
  todos: [],
  workspace: [],
  isLoading: false,
});
