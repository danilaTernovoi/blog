import React, { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { ContentContainer } from "../../components/Layout";
import defaultUserAvatar from "../../assets/img/user-default.png";
import "./SingleArticle.scss";
import { useTypedSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../helpers";
import { deleteArticle, favoriteArticle } from "../../api";
import classNames from "classnames";

const SingleArticle = () => {
  const nav = useNavigate();
  const contentDivRef = useRef<HTMLDivElement>(null);

  const { slug: slugParam } = useParams();
  const {
    auth: { user },
    articles: { list },
  } = useTypedSelector((state) => state);

  const { token } = user;

  const current = list.find((art) => art.slug === slugParam);

  const isAuthored = useMemo(
    () => user.username === current.author.username,
    [current, user]
  );

  useEffect(() => {
    const contentHTML = marked.parse(current.body);
    const { current: contentDiv } = contentDivRef;

    contentDiv.innerHTML = contentHTML;
  }, [contentDivRef]);

  return (
    <ContentContainer>
      <div className="article article_detail shadow">
        <header className="article__header">
          <div className="leftSide">
            <div className="titleLikesWrapper">
              <h1 className="article__title">{current.title}</h1>

              <div className="likes">
                <div
                  className={classNames({
                    likes__image: true,
                    likes__image_active: current.favorited,
                  })}
                />
                <span className="likes__count">{current.favoritesCount}</span>
              </div>
            </div>

            {current.tagList.length ? (
              <ul className="tags">
                {current.tagList.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {isAuthored ? (
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="btn btn_slim btn_success"
                onClick={() => nav(`/articles/${current.slug}/edit`)}
              >
                edit
              </button>
              <button className="btn btn_slim btn_danger" onClick={() => {}}>
                delete
              </button>
            </div>
          ) : null}

          <div className="profile article__profile">
            <div className="profile__data">
              <div className="profile__username">{current.author.username}</div>
              <div className="profile__created">
                {formatDate(current.createdAt)}
              </div>
            </div>

            <img
              className="profile__avatar"
              src={defaultUserAvatar}
              alt="avatar"
            />
          </div>
        </header>

        <p className="article__shortDescription">{current.description}</p>
        <div className="article__body" ref={contentDivRef}></div>
      </div>
    </ContentContainer>
  );
};

export default SingleArticle;
