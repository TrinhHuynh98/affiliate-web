import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import BookCard from "./BookCard";
import { bookData } from "./books";
import LoadMoreButton from "./loadMoreButton";
import { collection, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IBooks } from "../../type";
import Layout from "../Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import PopularItem from "./PopularItem";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const index = () => {
  const queryBookDataCurrentUser = query(collection(db, "books"));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bookSnapShot, __loading, __error] = useCollection(
    queryBookDataCurrentUser
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      {/* <Layout> */}
      <div id="book" className="w-full">
        <div className="max-w-[1240px] mx-auto px-2 py-16">
          <p className="text-xl tracking-widest uppercase text-orange-600">
            Books
          </p>
          <h2 className="py-4">List awsome books</h2>
          <section className="container mx-auto md:px-20 py-10">
            {/* <h3 className="mt-12 mb-6 pb-4 text-center">Book</h3> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md-12">
              {bookSnapShot?.docs?.map((book, index) => (
                <BookCard data={book.data()} key={index} />
              ))}
            </div>
            {/* <LoadMoreButton /> */}

            {/* <h3 className="text-center mt-10 mb-10">Most Popular</h3> */}
          </section>
          <p className="text-xl tracking-widest uppercase text-orange-600">
            Trending
          </p>
          <h2 className="py-4">Most Popular reading</h2>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
              },
            }}
            // slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {bookSnapShot?.docs?.map((book, index) => (
              <SwiperSlide key={index}>
                <PopularItem data={book.data()} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default index;
