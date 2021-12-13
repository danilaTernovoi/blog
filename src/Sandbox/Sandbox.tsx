import React, { useEffect } from "react";
import { MultipleArticlesResponseModel, UserResponseModel } from "../types";

import "./Sandbox.scss";

const Sandbox = () => {
  useEffect(() => {
    (async () => {
      // LOGIN
      const loginRes = await fetch("http://kata.academy:8022/users/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "diiiin1@yandex.ru",
            password: "omgDanilMobil1",
          },
        }),
      });

      const {
        user: { token, username },
      }: UserResponseModel = await loginRes.json();

      const updatedUserRes = await fetch(`http://kata.academy/user`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: {
            username: "diiiin1",
          },
        }),
      });
    })();
  }, []);

  return <div>Sandbox</div>;
};

export default Sandbox;
