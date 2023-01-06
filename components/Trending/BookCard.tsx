import Image from "next/image";
import React from "react";
import { Book } from "./books";
import { FiStar } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import { IBooks } from "../../type";
import Link from "next/link";

// interface IBook {
interface Idata {
  data: any;
}
const defaultIconSize = "1.875rem";

const BookCard: React.FC<Idata> = (props) => {
  const { data } = props;
  return (
    // <div className="card">
    //   <img src={data.images} alt="..." className="w-full" />
    //   <div className="p-4 text-white">
    //     <h4>{data.name}</h4>
    //     <p>{data.description}</p>
    //   </div>

    //   <button className="absolute bottom-0 right-0 rounded-full p-2">
    //     <Link href={data.link} target="_blank">
    //       <BsArrowRightCircle
    //         size={defaultIconSize}
    //         className="hover:scale-125 transition: ease-in-out duration-500 fill-white cursor-pointer"
    //       />
    //     </Link>
    //   </button>

    //   <div className="badge">
    //     <FiStar />
    //     <p>good</p>
    //   </div>
    // </div>
    <div className="items">
      <div className="images relative overflow-hidden">
        <Link href={"/"} legacyBehavior>
          <a>
            <img
              src={data.images}
              alt="..."
              width={500}
              height={350}
              className="rounded"
            />
          </a>
        </Link>
        {/* <div className="badge">
          <FiStar />
          <p>good</p>
        </div> */}
        <button className="absolute bottom-0 right-0 rounded-full p-2">
          <Link href={data.link} target="_blank">
            <BsArrowRightCircle
              size={defaultIconSize}
              className="hover:scale-125 transition: ease-in-out duration-500 fill-black cursor-pointer"
            />
          </Link>
        </button>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={"/"} legacyBehavior>
            <a className="text-orange-600 text-xl hover:text-orange-800">
              Author
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={data.link} legacyBehavior>
            <a className="text-gray-700 text-xl md:text-2xl hover:tex-gray-900">
              {data.name}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{data.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
