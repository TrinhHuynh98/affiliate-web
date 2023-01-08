import React, { ChangeEvent, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db, storage } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { IBooks } from "../type";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4, validate } from "uuid";
import { useSearchParams } from "next/navigation";
import SideBar from "../components/SideBar";
import Link from "next/link";
import { useRouter } from "next/router";

interface IImage {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

const EditBook = () => {
  const searchParams = useSearchParams();
  const [openDialogCreateBook, setOpenDialogCreateBook] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [imageUpload, setImageUpload] = useState<IImage>();
  const [imageUrl, setImageUrl] = useState("");
  const [bookId, setBookId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  const [value, setValue] = useState({
    name: "",
    link: "",
    des: "",
    author: "",
    id: "",
    image: "",
  });

  const open = searchParams.get("open");
  const name = searchParams.get("bookName");
  const link = searchParams.get("link");
  const des = searchParams.get("des");
  const author = searchParams.get("author");
  const bookid = searchParams.get("bookid");
  const image = searchParams.get("image");
  console.log("bookname", name);

  useEffect(() => {
    value.author = author ? author : "";
    value.name = name ? name : "";
    value.link = link ? link : "";
    value.des = des ? des : "";
    value.id = bookid ? bookid : "";
    value.image = image ? image : "";

    setBookName(name ? name : "");
    setBookLink(link ? link : "");
    setBookAuthor(author ? author : "");
    setBookDes(des ? des : "");
    setBookId(bookid ? bookid : "");
  }, [image, bookid, name, link, des, author]);

  console.log(
    "bookName, bookAuthor, bookLink, bookDes",
    bookName,
    bookAuthor,
    bookLink,
    bookDes
  );

  const isInvalidField = !bookName && !bookLink && !bookDes && !bookAuthor;

  const router = useRouter();

  const [isExistBook, setIsExistBook] = useState(false);

  console.log("imageUrl", imageUrl);

  //   Upload image
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null) {
      setImageUpload(files[0]);
      const imageRef = ref(storage, `images/${files[0].name + uuidv4()}`);
      uploadBytes(imageRef, files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setValue({ ...value, image: url });
          // setImageUrl(url);
        });
      });
    }
  };

  console.log("bookId", bookId);

  const handleUpdateNewBook = async () => {
    if (!isInvalidField) {
      const dataRequest = {
        name: value.name,
        link: value.link,
        description: value.des,
        author: value.author,
        images: value.image,
      };

      const collectionById = doc(db, "books", bookId);

      try {
        await updateDoc(collectionById, dataRequest);
        setStatusUpdate("Update Book successfully");
        setTimeout(() => {
          router.push("/books");
        }, 1000);
      } catch (error) {
        setStatusUpdate(`Update Book Failed ${error}`);
      }
    }
  };

  const resetField = () => {
    setBookDes("");
    setBookLink("");
    setBookName("");
    setBookAuthor("");
  };
  const handleClose = () => {
    setOpenDialogCreateBook(false);
    resetField();
    setStatusUpdate("");
  };

  useEffect(() => {
    if (open === "true") {
      setOpenDialogCreateBook(true);
    }
  }, [open]);
  console.log("open at edit book", open);
  return (
    <div className="flex">
      <SideBar />
      <div className="py-4 px-3">
        <div
          className={`fixed ${
            openDialogCreateBook ? "" : "hidden"
          } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 w-96 md:w-2/4 shadow-sm shadow-white rounded-md bg-white ">
            <div className="mt-3 text-center">
              <h3>Update Book</h3>
              <div className="mt-2 px-7 py-3">
                {/* {isExistBook && ( */}
                <p className="text-red-600">{statusUpdate}</p>
                {/* )} */}
                <label>
                  <h5 className="text-left">Book name:</h5>
                </label>
                <input
                  type="text"
                  id="book-name"
                  name="book name"
                  className="input"
                  value={value.name}
                  // onChange={(e) => setBookName(e.target.value)}
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                />

                <label>
                  <h5 className="text-left">Author:</h5>
                </label>
                <input
                  type="text"
                  id="book-name"
                  name="author"
                  className="input"
                  value={value.author}
                  // onChange={(e) => setBookAuthor(e.target.value)}
                  onChange={(e) =>
                    setValue({ ...value, author: e.target.value })
                  }
                />

                <label>
                  <h5 className="text-left">Link by book:</h5>
                </label>
                <input
                  type="text"
                  id="book-link"
                  name="book link"
                  className="input"
                  value={value.link}
                  onChange={(e) => setValue({ ...value, link: e.target.value })}
                  // onChange={(e) => setBookLink(e.target.value)}
                />

                <label>
                  <h5 className="text-left">Book image:</h5>
                </label>
                <input
                  type="file"
                  id="book-image"
                  name="book image"
                  className="input"
                  onChange={(e) => uploadImage(e)}
                />

                <label>
                  <h5 className="text-left">Book description:</h5>
                </label>
                <textarea
                  id="book-name"
                  name="book description"
                  rows={4}
                  className="input-area"
                  value={value.des}
                  onChange={(e) => setValue({ ...value, des: e.target.value })}
                  // onChange={(e) => setBookDes(e.target.value)}
                />
              </div>
              <div className="flex flex-cols justify-between items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="btn-dialog-cancel"
                  onClick={handleClose}
                >
                  <Link
                    legacyBehavior
                    href={{
                      pathname: "/books",
                    }}
                  >
                    Cancel
                  </Link>
                </button>

                <button
                  id="ok-btn"
                  className="btn-dialog-ok"
                  onClick={handleUpdateNewBook}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
