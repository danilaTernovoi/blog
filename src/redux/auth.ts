import { STORAGE_CURRENT_USER_KEY } from "../appConstants";
import { UserModel } from "../types";

interface AuthState {
  user: UserModel;
  error: string;
}

export interface LoginAction {
  type: "auth/setUser";
  payload: UserModel;
}

export interface LogoutAction {
  type: "auth/logout";
}

export interface SetAuthErrorAction {
  type: "auth/setError";
  payload: string;
}

export type AuthAction = LoginAction | SetAuthErrorAction | LogoutAction;

const init: AuthState = {
  user: null,
  error: "",
};

const authReducer = (state = init, action: AuthAction): AuthState => {
  switch (action.type) {
    case "auth/setUser": {
      const user = action.payload;

      return {
        ...state,
        error: "",
        user,
      };
    }

    case "auth/logout": {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);

      return {
        ...init,
        user: null,
      };
    }

    case "auth/setError": {
      const { payload: error } = action;

      return {
        ...state,
        error,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
