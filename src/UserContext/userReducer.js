import { userContext } from "./store";
import {
  SET_USER,
  SET_WORKSPACE,
  ADD_TODO,
  IS_SIGNEDIN,
  IS_LOADING,
} from "./actions.type";

const initialState = {

};

export default (state = initialState, { type, payload }) => {
  switch (actions.type) {
    case "SET_USER":
      return {userContext.user};

    default:
      return state;
  }
};
