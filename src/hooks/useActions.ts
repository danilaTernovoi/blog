import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions";

const useActions = () => {
  const dispatch = useDispatch();
  const bindedActions = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch]
  );

  return bindedActions;
};

export default useActions;
