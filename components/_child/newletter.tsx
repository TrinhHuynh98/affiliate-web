import React from "react";

const NewLetter = () => {
  return (
    <section className="bg-gray-50 mt-10">
      <div className="container mx-auto md:px-20 py-16 text-center">
        <h1 className="font-bold">Subscribe Newlatter</h1>

        <div className="py-4">
          <input
            type="text"
            className="shadow border rounded w-9/12 py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outlined"
            placeholder="Enter your email to subscribed"
          />
        </div>
        <button className="bg-orange-400 px-20 py-3 rounded-full text-white">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewLetter;
