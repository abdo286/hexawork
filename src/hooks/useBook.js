import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getBookRef } from "../services/Firebase";
import useUser from "./useUser";

const useBook = (category, bookId) => {
  const [book, setBook] = useState([]);
  const [bookLoading, setBookLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (category && bookId && user?.id) {
      const listenToCategory = (snapshot) => {
        setBook(snapshot.data());
        setBookLoading(false);
      };

      setBookLoading(true);
      const unsubscribe = onSnapshot(
        getBookRef(category,bookId, user.id),
        (snapshot) => {
          listenToCategory(snapshot);
        },
        (error) => {
          console.log(error);
          setBookLoading(false);
        }
      );

      return unsubscribe;
    }
  }, [category, bookId, user?.id]);

  return { book, bookLoading };
};

export default useBook;
