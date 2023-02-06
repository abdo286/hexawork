import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getBooksRef } from "../services/Firebase";
import useUser from "./useUser";

const useBooks = (category) => {
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (category && user?.id) {
      const listenToCategory = (snapshot) => {
        setBooks(snapshot.docs.map((doc) => doc.data()));
        setBooksLoading(false);
      };

      setBooksLoading(true);
      const unsubscribe = onSnapshot(
        getBooksRef(category, user.id),
        (snapshot) => listenToCategory(snapshot),
        (error) => {
          console.log(error);
          setBooksLoading(false);
        }
      );

      return unsubscribe;
    }
  }, [category, user?.id]);

  return { books, booksLoading };
};

export default useBooks;
