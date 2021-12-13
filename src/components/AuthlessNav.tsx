import { useNavigate } from "react-router-dom";

const overlay = {
  zIndex: 2,
};

const AuthlessNav = () => {
  const nav = useNavigate();

  return (
    <>
      {/* SIGN IN */}
      <button
        className="btn btn_success"
        onClick={() => nav(`/sign-in`)}
        style={overlay}
      >
        sign in
      </button>
      {/* SIGN UP */}
      <button
        className="btn btn_success"
        onClick={() => nav(`/sign-up`)}
        style={overlay}
      >
        sign up
      </button>
    </>
  );
};

export default AuthlessNav;
