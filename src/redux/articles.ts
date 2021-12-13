import {
  ArticleModel,
  NewArticleModel,
  NewArticleRequestModel,
} from "../types";

export interface ArticlesState {
  list: ArticleModel[];
}

export interface SetArticlesListAction {
  type: "articles/setList";
  payload: ArticleModel[];
}

export type ArticlesAction = SetArticlesListAction;

const init: ArticlesState = {
  list: [],
};

const articlesReducer = (
  state = init,
  action: ArticlesAction
): ArticlesState => {
  switch (action.type) {
    case "articles/setList":
      return {
        list: action.payload,
      };

    default:
      return state;
  }
};

export default articlesReducer;
