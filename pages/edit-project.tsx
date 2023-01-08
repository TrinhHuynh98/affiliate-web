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

const EditProject = () => {
  const searchParams = useSearchParams();

  const [openDialogCreateBook, setOpenDialogCreateBook] = useState(false);

  const [imageUpload, setImageUpload] = useState<IImage>();
  const [imageUrl, setImageUrl] = useState("");
  const [bookId, setBookId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  const current = new Date();

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [value, setValue] = useState({
    title: "",
    createAt: date,
    link: "",
    source: "",
    des: "",
    image: "",
    id: "",
  });

  const open = searchParams.get("open");
  const title = searchParams.get("title");
  const link = searchParams.get("link");
  const des = searchParams.get("des");
  const source = searchParams.get("source");
  const projectId = searchParams.get("id");
  const image = searchParams.get("image");

  useEffect(() => {
    value.title = source ? source : "";
    value.source = title ? title : "";
    value.link = link ? link : "";
    value.des = des ? des : "";
    value.id = projectId ? projectId : "";
    value.image = image ? image : "";
  }, [image, projectId, title, link, des, source]);

  const router = useRouter();

  //   Upload image
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null) {
      setImageUpload(files[0]);
      const imageRef = ref(storage, `images/${files[0].name + uuidv4()}`);
      uploadBytes(imageRef, files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setValue({ ...value, image: url });
        });
      });
    }
  };

  //   console.log("bookId", bookId);

  console.log("value.id", value.id);
  const handleUpdateProject = async () => {
    // if (!isInvalidField) {
    const dataRequest = {
      title: value.title,
      link: value.link,
      des: value.des,
      createAt: date,
      images: value.image,
      source: value.source,
    };

    const collectionById = doc(db, "projects", value.id);

    try {
      await updateDoc(collectionById, dataRequest);
      setStatusUpdate("Update Book successfully");
      setTimeout(() => {
        router.push("/projects");
      }, 1000);
    } catch (error) {
      setStatusUpdate(`Update Book Failed ${error}`);
    }
  };

  const handleClose = () => {
    setOpenDialogCreateBook(false);
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
                <p className="text-red-600">{statusUpdate}</p>
                <label>
                  <h5 className="text-left">Title:</h5>
                </label>
                <input
                  type="text"
                  id="book-name"
                  name="book name"
                  className="input"
                  value={value.title}
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
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
                  onChange={(e) => setValue({ ...value, link: e.target.value })}
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
                  onChange={(e) =>
                    setValue({ ...value, source: e.target.value })
                  }
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
                  onChange={(e) => setValue({ ...value, des: e.target.value })}
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
                      pathname: "/projects",
                    }}
                  >
                    Cancel
                  </Link>
                </button>

                <button
                  id="ok-btn"
                  className="btn-dialog-ok"
                  onClick={handleUpdateProject}
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

export default EditProject;
