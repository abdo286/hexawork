import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCategoriesRef } from "../services/Firebase";
import useUser from "./useUser";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      const listenToCategory = (snapshot) => {
        setCategories(snapshot.docs.map((doc) => doc.data()));
        setCategoriesLoading(false);
      };

      setCategoriesLoading(true);
      const unsubscribe = onSnapshot(
        getCategoriesRef(user.id),
        (snapshot) => listenToCategory(snapshot),
        (error) => {
          console.log(error);
          setCategoriesLoading(false);
        }
      );

      return unsubscribe;
    }
  }, [user?.id]);

  return { categories, categoriesLoading };
};

export default useCategories;
