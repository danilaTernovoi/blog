import { useNavigate } from "react-router";
import defaultUserAvatar from "../assets/img/user-default.png";
import { useActions, useTypedSelector } from "../hooks";

const AuthNav = () => {
  const nav = useNavigate();
  const { user } = useTypedSelector((state) => state.auth);
  const { username, image } = user;
  const { logout } = useActions();

  return (
    <>
      <button
        className="btn btn_success btn_slim"
        onClick={() => nav("/new-article")}
      >
        create article
      </button>
      <div className="user">
        <div className="user__username">{username}</div>
        <img
          className="user__avatar"
          src={image || defaultUserAvatar}
          alt="user avatar"
        />
      </div>
      <button
        className="btn btn_danger"
        style={{
          zIndex: 2,
        }}
        onClick={() => {
          console.log("logout");
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default AuthNav;
