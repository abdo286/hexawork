import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import Loading from "./Loading";
import AddBookNote from "../Components/AddBookNote";
import { BookNote } from "../Components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useNotes from "../hooks/useNotes";

const Book = () => {
  const { categoryId, id } = useParams();
  const { book, bookLoading } = useBook(categoryId, id);
  const { notes, notesLoading } = useNotes(id);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const navigate = useNavigate();

  return (
    <div className="w-[90vw] ml-12 relative top-32 pr-20 mb-48">
      {!bookLoading ? (
        <div className="grid grid-cols-[75fr_35fr] gap-12">
          {book?.pdfLink && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Viewer
                fileUrl={book?.pdfLink || null}
                plugins={[
                  // Register plugins
                  defaultLayoutPluginInstance,
                ]}
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "750px",
                }}
              />
            </Worker>
          )}
          <div className=" h-fit pb-8 sticky top-20 bottom-16">
            <AddBookNote bookId={book?.id || null} />

            {notesLoading ? (
              <Loading />
            ) : (
              <div className="mt-12 items-center shadow-3xl max-h-[25rem] overflow-auto flex flex-col gap-3 overflow-x-hidden">
                {notes.map((cur) => (
                  <BookNote key={cur.id} text={cur.text} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center absolute -top-11 -left-3 z-[5000]">
        <p
          className="bg-gray-700 text-white px-5 py-1 rounded-md cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </p>
      </div>
    </div>
  );
};

export default Book;
