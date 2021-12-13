import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface ProfileModel {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface GenericErrorModel {
  errors: {
    body: string[];
  };
}

export interface TagsResponseModel {
  tags: string[];
}

export interface UserModel {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface LoginUserModel {
  email: string;
  password: string;
}

export interface LoginUserRequestModel {
  user: LoginUserModel;
}

export interface NewUserModel {
  username: string;
  email: string;
  password: string;
}

export interface NewUserRequestModel {
  user: NewUserModel;
}

export interface UserResponseModel {
  user: UserModel;
}

export interface UpdateUserModel {
  email?: string;
  token?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UpdateUserRequestModel {
  user: UpdateUserModel;
}

export interface ArticleModel {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileModel;
}

export interface MultipleArticlesResponseModel {
  articles: ArticleModel[];
  articlesCount: number;
}

export interface SingleArticleResponseModel {
  article: ArticleModel;
}

export interface NewArticleModel {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface NewArticleRequestModel {
  article: NewArticleModel;
}

export interface UpdateArticleModel {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}

export interface UpdateArticleRequestModel {
  article: UpdateArticleModel;
}

export interface SignUpFields {
  email: string;
  password: string;
  username?: string;
  repeatPassword?: string;
  youAgree?: boolean;
}

export interface InputProps<T> {
  label: Path<T>;
  register: UseFormRegister<T>;
  config: RegisterOptions;
  type?: string;
  area?: boolean;
}
