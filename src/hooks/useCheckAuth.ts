import { useMemo } from "react";
import { useTypedSelector } from ".";

const useCheckAuth = () => {
  const {
    auth: { user },
  } = useTypedSelector((state) => state);

  const isAuth = useMemo(() => !!user, [user]);

  return isAuth;
};

export default useCheckAuth;
