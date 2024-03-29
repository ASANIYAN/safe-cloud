import {
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { data, db } from "../../Firebase/firebase";

const RecoveryFolderModal = () => {
  const {
    currentUser,
    showDeleteFolderModal,
    setShowDeleteFolderModal,
    folderName,
    setFolderName,
    id,
    setId,
  } = useAuth();

  function handleDelete() {
    //get all folders associated with folder to be deleted
    const q = query(
      data.foldersRef,
      where("parentId", "==", id),
      where("userId", "==", currentUser.uid)
    );
    //loops through each folder to get reference and then deletes them if q is not empty
    if (q) {
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      });
    }

    //gets all files associated with folder to be deleted
    const q1 = query(
      data.filesRef,
      where("folderId", "==", id),
      where("userId", "==", currentUser.uid)
    );
    //loops through each file to get reference and then deletes them if q1 is not empty
    if (q1) {
      onSnapshot(q1, (snapshot) => {
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      });
    }

    //deletes main doc
    const docRef = doc(db, "folders", id);
    deleteDoc(docRef);

    setShowDeleteFolderModal(false);
    setFolderName("");
    setId("");
  }

  return (
    <>
      {showDeleteFolderModal && (
        <div
          className="z-20 absolute shadow bg-white"
          style={{
            left: 0,
            right: 0,
            top: "15%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            maxWidth: "20rem",
          }}
        >
          <i
            className="fa-solid fa-xmark w-full text-lg text-right cursor-pointer pr-4 text-gray-400 pt-2"
            onClick={() => {
              setShowDeleteFolderModal(false);
              setFolderName("");
            }}
          ></i>
          <p className="font-semibold mt-1 text-center px-2">
            Are you sure you want to delete this folder?
          </p>
          <i className="fa-solid fa-folder text-homepageCloudIcon mt-4 text-center text-5xl w-full"></i>
          <p className="mt-3 font-medium text-center">{folderName}</p>
          <div className="text-center mt-3 mb-4">
            <button
              className="bg-progressbar text-white mt-4 mx-auto w-72 rounded py-1.5 font-bold"
              onClick={handleDelete}
            >
              Yeah, delete forever
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const RecoveryFolders = ({ folder }) => {
  const [toggle, setToggle] = useState(false);
  const { setShowDeleteFolderModal, setFolderName, setId } = useAuth();

  const btnRef = useRef(null);
  useOutsideAlerter(btnRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * removeTooltip if clicked on outside of parent element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggle(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function handleFolderRecovery(e) {
    e.preventDefault();
    let id = e.target.parentNode.getAttribute("data-key");
    const docRef = doc(db, "folders", id);

    updateDoc(docRef, {
      deleted: false,
    });
  }

  function handleModalShow(e) {
    e.preventDefault();
    const name = e.target.parentNode.parentNode.parentNode
      .querySelector(".folderName")
      .getAttribute("data-name");
    let id = e.target.parentNode.getAttribute("data-key");
    setFolderName(name);
    setId(id);
    // console.log(name);
    setToggle(false);
    setShowDeleteFolderModal(true);
  }

  return (
    <>
      <div
        key={folder.id}
        className="w-full text-md md:text-lg grid grid-cols-3 gap-6"
      >
        <div className="truncate">
          <span className="mx-2">
            <i className="fa-solid fa-folder text-homepageCloudIcon"></i>
          </span>
          <span data-name={folder.name} className="folderName">
            {folder && folder.name}
          </span>
        </div>

        <div>
          <p className="truncate">
            {folder &&
              folder.createdAt.toDate().toDateString() +
                " " +
                folder.createdAt.toDate().toLocaleTimeString("en-NG")}
          </p>
        </div>

        <div ref={btnRef} className="relative">
          <button
            onClick={() => setToggle((state) => !state)}
            className="text-black"
          >
            ...
          </button>
          {toggle && (
            <div
              className="w-44 shadow-[0_4px_20px_-1px_rgba(0,0,0,0.1)]  bg-white font-semibold text-sm absolute top-0 -left-40 mt-8 z-10"
              style={{ height: "72px" }}
              key={folder.id}
              data-key={folder.id}
            >
              <p
                className="pl-4 cursor-pointer hover:bg-gray-200 py-2"
                onClick={handleFolderRecovery}
              >
                Recover
              </p>
              <hr className="w-full" />
              <p
                className="pl-4 cursor-pointer hover:bg-gray-200 h-fit py-2"
                onClick={handleModalShow}
              >
                Delete Forever
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="my-3" />
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const RecoveryFileModal = ({ fileName }) => {
  const { showDeleteFileModal, setShowDeleteFileModal } = useAuth();

  return (
    <>
      {showDeleteFileModal && (
        <div
          className="z-20 absolute shadow w-80 bg-white"
          style={{ left: "40%", top: "25%" }}
        >
          <i
            className="fa-solid fa-xmark w-full text-lg text-right cursor-pointer pr-4 text-gray-400 pt-2"
            onClick={() => setShowDeleteFileModal(false)}
          ></i>
          <p className="font-semibold mt-1 text-center px-2">
            Are you sure you want to delete this file?
          </p>
          <i className="fa-solid fa-folder text-homepageCloudIcon mt-4 text-center text-5xl w-full"></i>
          <p className="mt-3 font-medium text-center">{fileName}</p>
          <div className="text-center mt-3 mb-4">
            <button className="bg-progressbar text-white mt-4 mx-auto w-72 rounded py-1.5">
              Yeah, delete forever
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const RecoveryFiles = ({ file }) => {
  const [toggle, setToggle] = useState(false);

  const btnRef = useRef(null);
  useOutsideAlerter(btnRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * removeTooltip if clicked on outside of parent element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggle(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function handleFileRecovery(e) {
    e.preventDefault();
    let id = e.target.parentNode.getAttribute("data-key");
    const docRef = doc(db, "files", id);

    updateDoc(docRef, {
      deleted: false,
    });
  }

  return (
    <>
      <div
        key={file.id}
        className="w-full text-md md:text-lg grid grid-cols-3 gap-6"
      >
        <div>
          <p className="truncate">
            <span className="mx-2">
              <i className="fa-solid fa-file"></i>
            </span>
            {file && file.name}
          </p>
        </div>

        <div>
          <p className="truncate">
            {file &&
              file.createdAt.toDate().toDateString() +
                " " +
                file.createdAt.toDate().toLocaleTimeString("en-NG")}
          </p>
        </div>

        <div ref={btnRef} className="relative">
          <button
            onClick={() => setToggle((state) => !state)}
            className="text-black"
          >
            ...
          </button>
          {toggle && (
            <div
              className="w-44 shadow-[0_4px_20px_-1px_rgba(0,0,0,0.1)]  bg-white font-semibold text-sm absolute top-0 -left-40 mt-8 z-10"
              style={{ height: "72px" }}
              key={file.id}
              data-key={file.id}
            >
              <p
                className="pl-4 cursor-pointer hover:bg-gray-200 py-2"
                onClick={handleFileRecovery}
              >
                Recover
              </p>
              <hr className="w-full" />
              <p className="pl-4 cursor-pointer hover:bg-gray-200 h-fit py-2">
                Delete Forever
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="my-3" />
    </>
  );
};

const RecoveryContent = () => {
  const { currentUser } = useAuth();
  let [folders, setFolders] = useState([]);
  let [files, setFiles] = useState([]);

  useEffect(() => {
    const q = query(
      data.foldersRef,
      where("deleted", "==", true),
      where("userId", "==", currentUser.uid, orderBy("createdAt", "desc"))
    );
    onSnapshot(q, (snapshot) => {
      setFolders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const q = query(
      data.filesRef,
      where("deleted", "==", true),
      where("userId", "==", currentUser.uid, orderBy("createdAt", "desc"))
    );
    onSnapshot(q, (snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="text-2xl font-bold mt-4">Recovery</h1>

        <div className="w-full mt-10">
          <div className="w-full text-gray-500 mt-4 text-sm grid grid-cols-3 gap-5">
            <h3>Name</h3>
            <h3>Last edited</h3>
          </div>
          <hr className="my-2" />
          {folders &&
            folders.map((folder) => (
              <RecoveryFolders key={folder.id} folder={folder} />
            ))}

          {files &&
            files.map((file) => <RecoveryFiles key={file.id} file={file} />)}
        </div>

        <RecoveryFolderModal />
      </section>
    </>
  );
};

export default RecoveryContent;
