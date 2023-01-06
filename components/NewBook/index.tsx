import React, { ChangeEvent, useState } from "react";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { IBooks } from "../../type";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface IImage {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

const CreateBook = () => {
  const [openDialogCreateBook, setOpenDialogCreateBook] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [imageUpload, setImageUpload] = useState<IImage>();
  const [imageUrl, setImageUrl] = useState("");

  const isInvalidField = !bookName && !bookLink && !bookDes && !bookAuthor;

  const queryBookDataCurrentUser = query(
    collection(db, "books")
    // where("name", "array-contains", bookName)
  );
  const [bookSnapShot, __loading, __error] = useCollection(
    queryBookDataCurrentUser
  );

  const isBookExistDB = (bookName: string) => {
    return bookSnapShot?.docs.find(
      (book: any) => (book.data() as IBooks).name === bookName
    );
  };

  const [isExistBook, setIsExistBook] = useState(false);

  //   Upload image
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null) {
      setImageUpload(files[0]);
      const imageRef = ref(storage, `images/${files[0].name + uuidv4()}`);
      uploadBytes(imageRef, files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };

  const handleSaveNewBook = async () => {
    if (isBookExistDB(bookName)) {
      setIsExistBook(true);
    }
    if (!isInvalidField && !isBookExistDB(bookName)) {
      //save new book
      await addDoc(collection(db, "books"), {
        name: bookName,
        link: bookLink,
        description: bookDes,
        author: bookAuthor,
        images: imageUrl,
      });
      handleClose();
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
  };
  const handleOpen = () => {
    setOpenDialogCreateBook(true);
  };

  return (
    <div>
      <button className="btn-auth" onClick={handleOpen}>
        Create new book
      </button>

      <div
        className={`fixed ${
          openDialogCreateBook ? "" : "hidden"
        } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div className="relative top-20 mx-auto p-5 w-96 md:w-2/4 shadow-sm shadow-white rounded-md bg-white ">
          <div className="mt-3 text-center">
            <h3>Create New Book</h3>
            <div className="mt-2 px-7 py-3">
              {isExistBook && (
                <p className="text-red-600">
                  Books already create. Try create another one!
                </p>
              )}
              <label>
                <h5 className="text-left">Book name:</h5>
              </label>
              <input
                type="text"
                id="book-name"
                name="book name"
                className="input"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />

              <label>
                <h5 className="text-left">Author:</h5>
              </label>
              <input
                type="text"
                id="book-name"
                name="book name"
                className="input"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
              />

              <label>
                <h5 className="text-left">Link by book:</h5>
              </label>
              <input
                type="text"
                id="book-link"
                name="book link"
                className="input"
                value={bookLink}
                onChange={(e) => setBookLink(e.target.value)}
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
                name="book name"
                rows={4}
                className="input-area"
                value={bookDes}
                onChange={(e) => setBookDes(e.target.value)}
              />
            </div>
            <div className="flex flex-cols justify-between items-center px-4 py-3">
              <button
                id="ok-btn"
                className="btn-dialog-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
              {isInvalidField ? (
                <>
                  <button className="btn-disable" disabled>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="ok-btn"
                    className="btn-dialog-ok"
                    onClick={handleSaveNewBook}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
