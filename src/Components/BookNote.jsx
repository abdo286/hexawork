import React from "react";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const BookNote = ({ text }) => {
  return (
    <div className="relative w-fit ">
      <textarea
        className="border-2 w-[26vw] shadow-md bg-gray-300 border-gray-300 max-h-[16rem] min-h-[8rem] rounded-md px-3 py-3"
        disabled
        value={text}
      />
    </div>
  );
};
export default BookNote;
