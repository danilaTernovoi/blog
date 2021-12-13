import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MultipleArticle from "./pages/MultipleArticle";
import SingleArticle from "./pages/SingleArticle";
import { CreateArticle, EditArticle, SignIn, SignUp } from "./components/Forms";
import Header from "./components/Header";
import { STORAGE_CURRENT_USER_KEY } from "./appConstants";
import { useActions } from "./hooks";

const App = () => {
  const { setUser } = useActions();

  useEffect(() => {
    const loginedUserJSON = localStorage.getItem(STORAGE_CURRENT_USER_KEY);

    if (loginedUserJSON) {
      const loginedUser = JSON.parse(loginedUserJSON);
      setUser(loginedUser);
    }
  }, []);

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="*" element={<Navigate to="/articles" />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
          <Route path="/articles" element={<MultipleArticle />} />
          <Route path="/articles/:slug" element={<SingleArticle />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
