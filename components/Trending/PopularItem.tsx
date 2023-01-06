import Image from "next/image";
import React from "react";
import { Book } from "./books";
import { FiStar } from "react-icons/fi";
import { IBooks } from "../../type";
import Link from "next/link";

// interface IBook {
interface Idata {
  data: any;
}
const defaultIconSize = "1.875rem";

const PopularItem: React.FC<Idata> = (props) => {
  const { data } = props;
  return (
    <div className="grid">
      <div className="images">
        <Link href={"/"} legacyBehavior>
          <a>
            <img
              src={data.images}
              alt="..."
              width={600}
              height={400}
              className="rounded"
            />
          </a>
        </Link>
        {/* <div className="badge">
          <FiStar />
          <p>good</p>
        </div> */}
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
        {/* <p className="text-gray-500 py-3">{data.description}</p> */}
      </div>
    </div>
  );
};

export default PopularItem;
