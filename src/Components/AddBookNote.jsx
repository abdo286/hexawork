import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { AddNoteToFireStore } from "../services/Firebase";
import { nanoid } from "nanoid";
import { useState } from "react";

const initialState = {
  text: "",
};

const AddBookNote = ({ bookId }) => {
  const [note, setNote] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const updateInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNote((note) => ({
      ...note,
      [name]: value,
    }));
  };

  const SaveData = async () => {
    setLoading(true);
    if (!note.text) {
      toast.error("Fill All the Fields");
      return;
    }
    try {
      await AddNoteToFireStore(
        {
          ...note,
          id: nanoid(),
          createdAt: new Date(),
        },
        { userId: user.id, bookId }
      );
      toast.success("Note Saved Successfully");
      setNote(initialState);
      setLoading(false);
    } catch (error) {
      toast.error("There was an Error");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="px-3 bg-gray-500 overflow-x-hidden pt-8 pb-12 rounded-md w-[30vw] max-h-[80vh] overflow-auto  flex flex-col gap-8 outline-none   ">
      <div>
        <textarea
          value={note.text}
          name="text"
          onChange={updateInput}
          className="shadow-lg border-2 outline-none w-full border-gray-200 h-32 rounded-md px-3 py-1 mb-5"
        />
        <div>
          <div className="flex">
            <button
              disabled={loading}
              className="bg-gray-800 text-white px-3 py-2 relative top-3 rounded-md h-fit ml-auto"
              onClick={SaveData}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookNote;

// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";

// import AddAudioToNote from "./AddAudio";

// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";

// const uploadAudio = (e) => {
//   if (user?.id) {
//     setLoading(true);
//     const audioFile = e;
//     const storage = getStorage();
//     const audioRef = ref(storage, `${user.id}/audios/${audioFile.name}`);
//     const uploadTask = uploadBytesResumable(audioRef, audioFile);
//     uploadTask.on(
//       "state_changed",
//       (snapShot) => {},
//       (error) => {
//         setLoading(false);
//         toast.error("There was an Error");
//         console.log(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setLoading(false);
//           setNote((note) => ({
//             ...note,
//             audioSrc: downloadURL,
//           }));
//           toast.success("audio Uploaded Successfully");
//         });
//       }
//     );
//   }
// };

// const deleteAudio = async () => {
//   setLoading(true);
//   const storage = getStorage();
//   const imageRef = ref(storage, note.audioSrc);
//   try {
//     await deleteObject(imageRef);
//     setLoading(false);
//     setNote((note) => ({
//       ...note,
//       audioSrc: "",
//     }));
//     toast.success("Audio deleted Successfully");
//   } catch (error) {
//     setLoading(false);
//     toast.error("There was an Error");
//     console.log(error);
//   }
// };

/* <AddAudioToNote
            audioSrc={note.audioSrc}
            uploadAudio={uploadAudio}
            deleteAudio={deleteAudio}
          /> */
