import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { data } from "../../Firebase/firebase";

const RecoveryFolders = ({ folder }) => {
    const [ toggle, setToggle ] = useState(false);
    
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
    return (
        <>
            <div 
            key={folder.id}
            className="w-full text-md md:text-lg grid grid-cols-3 gap-6">
                <div>
                    <p className="truncate">
                        <span className="mx-2"><i className="fa-solid fa-folder text-homepageCloudIcon"></i></span>
                        { folder && folder.name }
                    </p>
                </div>
                
                <div>
                    <p className="truncate">
                        { folder && folder.createdAt.toDate().toDateString() + " " + folder.createdAt.toDate().toLocaleTimeString('en-NG') }
                    </p>
                </div>
                
                <div ref={btnRef} className="relative">
                    <button onClick={() => setToggle(state => !state)} className="text-black">
                        ...
                    </button>
                    {
                        toggle &&
                        <div 
                        className="w-44 shadow-[0_4px_20px_-1px_rgba(0,0,0,0.1)]  bg-white font-semibold text-sm absolute top-0 -left-40 mt-8 z-10" 
                        style={{height: "72px"}}
                        key={folder.id}
                        >
                            <p className="pl-4 cursor-pointer hover:bg-gray-200 py-2">Recover</p>
                            <hr className="w-full" />
                            <p className="pl-4 cursor-pointer hover:bg-gray-200 h-fit py-2">Delete Forever</p>
                        </div>
                    }
                </div>

            </div>
            <hr className="my-3" />
        </>
    );
}

const RecoveryContent = () => {
    
    const { currentUser } = useAuth();
    let [folders, setFolders] = useState([]);
    
    useEffect(() => {
        const q = query(data.foldersRef, where("deleted", "==", true), where("userId", "==", currentUser.uid, orderBy("createdAt", "desc")));
        onSnapshot(q, (snapshot) => {
            setFolders(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, []);
    // console.log(folders);
    


    
    // return () =>  unsubscribe();
    // console.log(folders.map(folder=> folder));

    return (
        <section className="container">
            <h1 className="text-2xl font-bold mt-4">
                Recovery
            </h1>

            <div className="w-full mt-10">
                <div className="w-full text-gray-500 mt-4 text-sm grid grid-cols-3 gap-5">
                    <h3>
                        Name
                    </h3>
                    <h3>
                        Last edited
                    </h3>
                </div>
                <hr className="my-2" />
                {
                    folders && folders.map((folder) => (
                        <RecoveryFolders folder={folder} />

                    ))
                }
            </div>

        </section>
    );
}
 
export default RecoveryContent;