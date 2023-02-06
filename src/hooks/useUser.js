import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/Firebase";
import useAuthListener from "./useAuthListener";
const useUser = () => {
  const [activeUser, setActiveUser] = useState(null);
  const { user } = useAuthListener();

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const response = await getUserByUserId(user.uid);
      setActiveUser({
        ...response.data(),
        id: response.id,
      });
    };

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
};

export default useUser;
