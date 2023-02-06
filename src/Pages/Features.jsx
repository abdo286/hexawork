import login from "../images/how_it_works/login.svg";
import books from "../images/how_it_works/books.svg";
import search from "../images/how_it_works/search for a book.svg";
import read from "../images/how_it_works/read a book online.svg";
import listen from "../images/how_it_works/listen to a book audio .svg";
import fav from "../images/how_it_works/favorite.svg";
import note from "../images/how_it_works/add notes for a book.svg";
import viewer from "../images/how_it_works/book viewer.svg";
import { Functionality } from "../Components";
import { nanoid } from "nanoid";

const functionalities = [
  { img: login, title: "Sign Up & Login", id: nanoid() },
  { img: books, title: "Books", id: nanoid() },
  { img: search, title: "Search for a book", id: nanoid() },
  { img: read, title: "Read a book", id: nanoid() },
  { img: listen, title: "Listen to a book audio", id: nanoid() },
  { img: viewer, title: "PDF book viewer", id: nanoid() },
  { img: fav, title: "Put a book as a favorite", id: nanoid() },
  { img: note, title: "Take notes in a book", id: nanoid() },
];

const Features = () => {
  return (
    <div className="mt-32 flex justify-center min-h-[45vh]">
      <div className="how-it-works bg-zinc-100 my-12 p-12">
        <h2 className="text-center text-6xl font-bold">How it Works</h2>
        <div className="features grid grid-cols-3 mt-12 gap-12 justify-center items-center">
          {functionalities.map((cur, index) => (
            <Functionality
              key={cur.id}
              img={cur.img}
              title={cur.title}
              number={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
