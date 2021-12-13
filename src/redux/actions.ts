import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { getArticles, loginUser } from "../api";
import { STORAGE_CURRENT_USER_KEY, STORAGE_ERRORS_KEY } from "../appConstants";
import {
  ArticleModel,
  LoginUserModel,
  UserModel,
  UserResponseModel,
} from "../types";
import { ArticlesAction, SetArticlesListAction } from "./articles";
import { AuthAction, LoginAction, LogoutAction } from "./auth";

type AuthDispatch = Dispatch<AuthAction>;
type ArticlesDispatch = Dispatch<ArticlesAction>;

export const setUser = (user: UserModel): LoginAction => ({
  type: "auth/setUser",
  payload: user,
});

export const login =
  (user: LoginUserModel, onLogin: () => void) =>
  async (dispatch: AuthDispatch) => {
    const loginResponse = await loginUser({ user });

    if (!loginResponse.ok) {
      const err = "invalid email or password";

      localStorage.setItem(STORAGE_ERRORS_KEY, JSON.stringify(err));

      return dispatch({
        type: "auth/setError",
        payload: err,
      });
    }

    const { user: loginedUser }: UserResponseModel = await loginResponse.json();
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(loginedUser));

    dispatch({
      type: "auth/setUser",
      payload: loginedUser,
    });

    onLogin();
  };

export const logout = (): LogoutAction => ({ type: "auth/logout" });

export const setArticlesList = (
  articles: ArticleModel[]
): SetArticlesListAction => ({
  type: "articles/setList",
  payload: articles,
});

export const fetchAllArticles = () => async (dispatch: ArticlesDispatch) => {
  const { articles } = await getArticles();
  dispatch(setArticlesList(articles));
};
