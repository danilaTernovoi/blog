import React, { useEffect, useMemo, useState } from "react";
import { getArticles } from "../../api";
import Article from "../../components/Article";
import { ContentContainer } from "../../components/Layout";
import SlideTransition from "../../components/SlideTransition";
import Spinner from "../../components/Spinner";
import { useActions, useTypedSelector } from "../../hooks";

import "./MultipleArticle.scss";

const MultipleArticle = () => {
  const { list } = useTypedSelector((state) => state.articles);
  const { fetchAllArticles } = useActions();

  const hasArticles = useMemo(() => !!list.length, [list]);

  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  return (
    <ContentContainer>
      {hasArticles ? (
        list.map((art) => <Article data={art} key={art.slug} />)
      ) : (
        <Spinner />
      )}
    </ContentContainer>
  );
};

export default MultipleArticle;
