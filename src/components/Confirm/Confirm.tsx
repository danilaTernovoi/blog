import React, { FC, ReactNode, useState } from "react";
import confirmIcon from "../../assets/img/confirm-warning.svg";

import "./Confirm.scss";

interface ConfirmProps {
  vis: boolean;
  confirm: () => void;
  onConfirm: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
  children,
  vis,
  confirm,
  onConfirm,
}) => {
  return (
    <div className="confirmContainer">
      {children}
      {vis ? (
        <div className="confirm shadow">
          <header className="confirm__header">
            <img src={confirmIcon} alt="oops" />
            <p className="confirm__message">
              Are you sure to delete this article?
            </p>
          </header>
          <div className="confirm__buttons">
            <button className="confirm__button" onClick={confirm}>
              no
            </button>
            <button
              className="confirm__button"
              onClick={() => {
                confirm();
                onConfirm();
              }}
            >
              yes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const useConfirm = () => {
  const [vis, setVis] = useState<boolean>(false);

  const confirm = () => setVis((prev) => !prev);
  const toggleConfirm = () => setVis((prev) => !prev);
  const show = () => setVis(true);

  return {
    toggleConfirm,
    confirm,
    vis,
    show,
  };
};
