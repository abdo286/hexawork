import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getNotesRef } from "../services/Firebase";
import useUser from "./useUser";

const useNotes = (bookId) => {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (bookId && user?.id) {
      const listenTobooks = (snapshot) => {
        setNotes(snapshot.docs.map((doc) => doc.data()));
        setNotesLoading(false);
      };

      setNotesLoading(true);
      const unsubscribe = onSnapshot(
        getNotesRef({ bookId, userId: user.id }),
        (snapshot) => listenTobooks(snapshot),
        (error) => {
          console.log(error);
          setNotesLoading(false);
        }
      );

      return unsubscribe;
    }
  }, [bookId, user?.id]);

  return { notes, notesLoading };
};

export default useNotes;
