import React, { FC } from "react";
import cls from "classnames";
import { useNavigate } from "react-router-dom";
import { ArticleModel } from "../../types";
import { formatDate } from "../../helpers";
import defaultUserAvatar from "../../assets/img/user-default.png";
import "./Article.scss";

interface ArticleProps {
  data: ArticleModel;
}

const Article: FC<ArticleProps> = ({ data }) => {
  const {
    title,
    description,
    favorited,
    createdAt,
    favoritesCount,
    tagList,
    slug,
    author: articleAuthor,
  } = data;

  const nav = useNavigate();
  const toDetail = () => {
    nav(`/articles/${slug}`);
  };

  return (
    <div className="article shadow">
      <header className="article__header">
        <div className="leftSide">
          <div className="titleLikesWrapper">
            <h1 className="article__title" onClick={toDetail}>
              {title}
            </h1>
            <div className="likes">
              <div
                className={cls("likes__image", {
                  likes__image_active: favorited,
                  // todo: добавлять этот класс, когда пользователь не авторизован
                  likes__image_noAuth: true,
                })}
              />
              <span className="likes__count">{favoritesCount}</span>
            </div>
          </div>

          <ul className="tags">
            {tagList.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="profile article__profile">
          <div className="profile__data">
            <div className="profile__username">{articleAuthor.username}</div>
            <div className="profile__created">{formatDate(createdAt)}</div>
          </div>
          <img
            className="profile__avatar"
            src={defaultUserAvatar}
            alt="avatar"
          />
        </div>
      </header>
      <p className="article__shortDescription">{description}</p>
    </div>
  );
};

export default Article;
