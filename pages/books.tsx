import React, { useEffect, useState } from "react";
import CreateBook from "../components/NewBook";
import SideBar from "../components/SideBar";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import EditBook from "../components/EditBook";
import Link from "next/link";

interface IBook {
  data: any;
}

const Book = () => {
  const queryBookDataCurrentUser = query(collection(db, "books"));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bookSnapShot, __loading, __error] = useCollection(
    queryBookDataCurrentUser
  );

  const [bookId, setBookId] = useState("");
  const getSelectdBook = (item: string) => {
    setBookId(item);
  };

  const deleteBook = async (id: string) => {
    // alert(`delete ${id}`);
    const _todo = doc(db, `books/${id}`);
    try {
      await deleteDoc(_todo);
      alert("Book created succesfully");
    } catch (error) {
      alert("Book created failed");
    }
  };

  console.log("bookId", bookId);

  // getSpectificBooks
  const [dataDetail, setDataDetail] = useState<any>();
  useEffect(() => {
    const specificData = bookSnapShot?.docs.find(
      (item) => item.data()?.id === bookId
    );
    setDataDetail(specificData);
  }, [bookId]);

  const [item, setItem] = useState({
    name: "",
    link: "",
    description: "",
    author: "",
  });

  useEffect(() => {
    setItem({
      ...item,
      name: dataDetail?.data().name,
      link: dataDetail?.data().name,
      description: dataDetail?.data().description,
      author: dataDetail?.data().author,
    });
  }, [dataDetail]);

  console.log("dataDetail?.data().name", dataDetail?.data().name);

  console.log("item.name", item.name);

  console.log("bookId", bookId);
  // console.log("book?.data().name,", book?.data().name);
  return (
    <div className="flex">
      <SideBar />
      <div className="py-4 px-3">
        <CreateBook />

        {/* table books */}
        {/* <div className="p-3"> */}
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block center">
              <div className="overflow-hidden border rounded-lg"></div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Author
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Link
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Description
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookSnapShot?.docs?.map((book, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {book?.data().name}
                  </td>
                  <td>{book?.data().author}</td>

                  <td>
                    {book?.data().link.length > 100
                      ? `${book?.data().link.substring(0, 100)}...`
                      : book?.data().link}{" "}
                  </td>
                  <td>
                    {book?.data().description.length > 100
                      ? `${book?.data().description.substring(0, 100)}...`
                      : book?.data().description}{" "}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link
                      legacyBehavior
                      href={{
                        pathname: "/edit-book",
                        query: {
                          bookid: book?.data().id,
                          bookName: book?.data().name,
                          link: book?.data().link,
                          des: book?.data().description,
                          author: book?.data().author,
                          image: book?.data().images,
                          open: true,
                        },
                      }}
                    >
                      <a
                        className="text-green-500 hover:text-green-700"
                        href="#"
                        onClick={() => {
                          getSelectdBook(book?.data()?.id);
                        }}
                      >
                        Edit
                      </a>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      className="text-red-500 hover:text-red-700"
                      href="#"
                      onClick={() => {
                        deleteBook(book?.data()?.id);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Book;
