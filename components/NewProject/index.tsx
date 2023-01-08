import React, { ChangeEvent, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { IProject } from "../../type";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface IImage {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

const NewProject = () => {
  const [openDialogCreateBook, setOpenDialogCreateBook] = useState(false);
  // const [bookName, setBookName] = useState("");
  // const [bookLink, setBookLink] = useState("");
  // const [bookDes, setBookDes] = useState("");
  // const [bookAuthor, setBookAuthor] = useState("");
  const [imageUpload, setImageUpload] = useState<IImage>();
  const [imageUrl, setImageUrl] = useState("");

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [value, setvalue] = useState({
    title: "",
    createAt: date,
    link: "",
    source: "",
    des: "",
    image: "",
    id: "",
  });

  const [id, setId] = useState(uuidv4());

  // const isInvalidField = !value.title && !value.createAt && !value. && !bookAuthor;

  const queryProjectDataCurrentUser = query(
    collection(db, "projects")
    // where("name", "array-contains", bookName)
  );
  const [projectSnapShot, __loading, __error] = useCollection(
    queryProjectDataCurrentUser
  );

  const isBookExistDB = (projectTitle: string) => {
    return projectSnapShot?.docs.find(
      (book: any) => (book.data() as IProject).title === projectTitle
    );
  };

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
          // setImageUrl(url);
          setvalue({ ...value, image: url });
        });
      });
    }
  };
  console.log("projectid", id);
  const handleSaveNewProject = async () => {
    if (isBookExistDB(value.title)) {
      setIsExistBook(true);
    }
    // setId(uuidv4());
    if (!isBookExistDB(value.title)) {
      const dataRequest = {
        id: id,
        title: value.title,
        link: value.link,
        des: value.des,
        createAt: date,
        images: value.image,
        source: value.source,
      };
      console.log("dataRequest", dataRequest);
      const collectionById = doc(db, "projects", id);
      await setDoc(collectionById, dataRequest, { merge: true });
      handleClose();
    }
  };

  const resetField = () => {
    setvalue({
      title: "",
      createAt: "",
      link: "",
      source: "",
      des: "",
      image: "",
      id: "",
    });
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
      <button
        className="rounded-lg bg-orange-400 text-white p-2 cursor-pointer uppercase"
        onClick={handleOpen}
      >
        Create new project
      </button>

      <div
        className={`fixed ${
          openDialogCreateBook ? "" : "hidden"
        } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div className="relative top-20 mx-auto p-5 w-96 md:w-2/4 shadow-sm shadow-white rounded-md bg-white ">
          <div className="mt-3 text-center">
            <h3>Create New Project</h3>
            <div className="mt-2 px-7 py-3">
              {isExistBook && (
                <p className="text-red-600">
                  Project already create. Try create another one!
                </p>
              )}
              <label>
                <h5 className="text-left">Title:</h5>
              </label>
              <input
                type="text"
                id="book-name"
                name="book name"
                className="input"
                value={value.title}
                onChange={(e) => setvalue({ ...value, title: e.target.value })}
              />

              <label>
                <h5 className="text-left">Demo:</h5>
              </label>
              <input
                type="text"
                id="book-link"
                name="book link"
                className="input"
                value={value.link}
                onChange={(e) => setvalue({ ...value, link: e.target.value })}
                // onChange={(e) => setDemo(e.target.value)}
              />

              <label>
                <h5 className="text-left">Source:</h5>
              </label>
              <input
                type="text"
                id="book-link"
                name="book link"
                className="input"
                value={value.source}
                onChange={(e) => setvalue({ ...value, source: e.target.value })}
                // onChange={(e) => setSource(e.target.value)}
              />

              <label>
                <h5 className="text-left">Project image:</h5>
              </label>
              <input
                type="file"
                id="project-image"
                name="project image"
                className="input"
                onChange={(e) => uploadImage(e)}
              />

              <label>
                <h5 className="text-left">Project description:</h5>
              </label>
              <textarea
                id="book-name"
                name="book name"
                rows={4}
                className="input-area"
                value={value.des}
                // onChange={(e) => setDes(e.target.value)}
                onChange={(e) => setvalue({ ...value, des: e.target.value })}
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

              <button
                id="ok-btn"
                className="btn-dialog-ok"
                onClick={handleSaveNewProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
