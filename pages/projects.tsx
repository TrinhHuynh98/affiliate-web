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
import NewProject from "../components/NewProject";

interface IProject {
  data: any;
}

const Project = () => {
  const queryProjectDataCurrentUser = query(collection(db, "projects"));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [projectSnapShot, __loading, __error] = useCollection(
    queryProjectDataCurrentUser
  );

  useEffect(() => {
    projectSnapShot?.docs.map((item, index) => [
      console.log("projectItem", item.data()),
    ]);
  }, [projectSnapShot]);

  console.log("projectSnapShot", projectSnapShot);

  const [id, setId] = useState("");
  const getSelectdBook = (item: string) => {
    setId(item);
  };

  const deleteProject = async (id: string) => {
    const _todo = doc(db, `projects/${id}`);
    try {
      await deleteDoc(_todo);
      alert("Project created succesfully");
    } catch (error) {
      alert("Project created failed");
    }
  };

  console.log("project", id);

  return (
    <div className="flex">
      <SideBar />
      <div className="py-4 px-3">
        <NewProject />

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
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  CreateAt
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
                  Source
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
              {projectSnapShot?.docs?.map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {project?.data().title}
                  </td>
                  {/* <td>{getCurrentDate(project?.data().createAt)}</td> */}
                  <td>{project?.data().createAt}</td>
                  <td>{project?.data().link}</td>
                  <td>{project?.data().source}</td>
                  <td>{project?.data().des}</td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link
                      legacyBehavior
                      href={{
                        pathname: "/edit-project",
                        query: {
                          id: project?.data().id,
                          title: project?.data().title,
                          link: project?.data().link,
                          source: project?.data().source,
                          des: project?.data().des,
                          image: project?.data().images,
                          open: true,
                        },
                      }}
                    >
                      <a
                        className="text-green-500 hover:text-green-700"
                        href="#"
                        onClick={() => {
                          getSelectdBook(project?.data()?.id);
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
                        deleteProject(project?.data()?.id);
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

export default Project;
