import {
  LoginUserRequestModel,
  MultipleArticlesResponseModel,
  NewArticleRequestModel,
  NewUserRequestModel,
  SingleArticleResponseModel,
  UpdateArticleRequestModel,
  UpdateUserRequestModel,
  ProfileModel,
  UserResponseModel,
  GenericErrorModel,
} from "../types";

const jsonContentSpread = () => ({
  "Content-Type": "application/json;charset=utf8",
});

const authSpread = (token: string) => ({ Authorization: `Token ${token}` });
const root = (pathToEnd: string) => `http://kata.academy:8022/${pathToEnd}`;
const insertSlug = (url: string, slug: string): string =>
  url.replace(/:slug/gi, slug);

enum Urls {
  CreateArticle = "articles",
  MultipleArticles = "articles",
  SingleArticle = "articles/:slug",
  UpdateArticle = "articles/:slug",
  DeleteArticle = "articles/:slug",
  FavoriteArticle = "articles/:slug/favorite",
  UserRegister = "users",
  UserLogin = "users/login",
  UserUpdate = "user",
}

// Получить статьи
export const getArticles = async (): Promise<MultipleArticlesResponseModel> => {
  const url = root(Urls.MultipleArticles);
  const response = await fetch(url);

  const json = await response.json();
  return json;
};

// Получить отдельную статью
export const getSingleArticle = async (
  slug: string
): Promise<SingleArticleResponseModel> => {
  const url = root(Urls.SingleArticle.replace(/:slug/, slug));
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// Создать статью
export const createArticle = async (
  data: NewArticleRequestModel,
  token: string
) => {
  const url = root(Urls.CreateArticle);
  const response = await fetch(url, {
    method: "post",
    headers: {
      ...jsonContentSpread(),
      ...authSpread(token),
    },
    body: JSON.stringify(data),
  });

  return response;
};

// Редактировать статью
export const editArticle = async (
  data: UpdateArticleRequestModel,
  slug: string,
  token: string
) => {
  const url = root(Urls.UpdateArticle.replace(":slug", slug));
  const response = await fetch(url, {
    method: "put",
    headers: {
      ...authSpread(token),
      ...jsonContentSpread(),
    },

    body: JSON.stringify(data),
  });

  return response;
};

// Удалить статью
export const deleteArticle = async (slug: string, token: string) => {
  const url = root(Urls.DeleteArticle.replace(":slug", slug));
  try {
    const response = await fetch(url, {
      method: "DELETE",

      headers: {
        ...authSpread(token),
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Зарегистрировать пользователя
export const registerUser = async (data: NewUserRequestModel) => {
  const url = root(Urls.UserRegister);

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      ...jsonContentSpread(),
    },
  });

  return response;
};

// Вход
export const loginUser = async (data: LoginUserRequestModel) => {
  const url = root(Urls.UserLogin);
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      ...jsonContentSpread(),
    },
  });

  return response;
};

// Редактировать профиль
export const editProfile = async (
  data: UpdateUserRequestModel,
  token: string
) => {
  const url = root(Urls.UserUpdate);
  const response = await fetch(url, {
    method: "put",
    headers: {
      ...jsonContentSpread(),
      ...authSpread(token),
    },
  });

  return response;
};

export const favoriteArticle = async (slug: string, token: string) => {
  const url = insertSlug(Urls.FavoriteArticle, slug);
  const favoriteRes = await fetch(url, {
    method: "post",

    headers: {
      ...authSpread(token),
      ...jsonContentSpread(),
    },
  });

  return favoriteRes;
};

export const unfavoriteArticle = async (slug: string, token: string) => {
  const url = insertSlug(Urls.FavoriteArticle, slug);
  const unfavoriteRes = await fetch(url, {
    method: "delete",
    headers: {
      ...authSpread(token),
    },
  });

  return unfavoriteRes;
};
