import library from "../images/library_.jpg";
import React from "react";

const About = () => {
  return (
    <div className="mt-32 flex justify-center min-h-[45vh]">
      <h4 className="text-8xl w-1/3 text-center font-bold text-white absolute top-32 left-1/3 bg-gray-700 bg-opacity-70 rounded-full p-4">
        About Us
      </h4>
      <div className="description w-1/3 bg-gray-700 text-white font-bold text-3xl text-justify p-6 rounded-lg absolute -bottom-36 left-1/3 duration-500 hover:-translate-y-20">
        The library management system is a system that helps you to view various
        books in different fields. Enjoy the best books in our library with the
        cheapest prices and the availability of all the capabilities that you
        may need on your journey of deep reading. You can borrow and buy from
        the library in the way you prefer, start now.
      </div>
      <img src={library} alt="library-background" />
    </div>
  );
};

export default About;  

