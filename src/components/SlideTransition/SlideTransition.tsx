import { FC } from "react";
import { CSSTransition } from "react-transition-group";
import "./SlideTransition.scss";
interface SlideTransitionProps {
  inFlag: boolean;
  timeout?: number;
}

const SlideTransition: FC<SlideTransitionProps> = ({
  inFlag,
  children,
  timeout = 250,
}) => {
  return (
    <CSSTransition in={inFlag} timeout={timeout} mountOnEnter unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export default SlideTransition;
