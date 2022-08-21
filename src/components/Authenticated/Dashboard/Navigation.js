import { getAuth, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {

    const [showSideBar, setShowSideBar] = useState(false);
    function toggleSideBar() {
        setShowSideBar(show => !show);
    }

    const sideBarRef = useRef(null);
    useOutsideAlerter(sideBarRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * removeTooltip if clicked on outside of parent element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setShowSideBar(false);
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

      const navigate = useNavigate();

      function handleLogout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/landing');
        }).catch((error) => {
            // An error happened.
        });
      }

      

    return (
        <>
            <i onClick={toggleSideBar} className="fa-solid fa-bars text-googleBtnText text-xl mt-5 ml-3 cursor-pointer"></i>
            <aside ref={sideBarRef} className={`w-64 h-screen absolute z-10 ${showSideBar ? "left-0" : "-left-80"} transition-all ease-out duration-500`} aria-label="Sidebar">
                <nav className="py-4 px-3 h-full bg-sideBar">
                    <div className="flex justify-between">
                        <Link to="/" className="flex items-center p-2 text-base font-normal rounded-lg">
                            <i className="fa-solid fa-cloud-arrow-down text-xl text-homepageCloudIcon"></i>
                            <span className="ml-3 text-white pt-1">Safecloud</span>
                        </Link>
                        <i onClick={() => setShowSideBar(false)} className="fa-solid block fa-xmark pt-3 text-right text-white w-full cursor-pointer text-2xl"></i>
                    </div>
                    <ul className="space-y-5 text-white mt-3">
                        <li>
                            <Link to="/" className="flex items-center p-2 text-base font-normal  rounded-lg hover:bg-sideBarHover">
                                <i className="fa-solid fa-house"></i>
                                <span className="ml-3">Homepage</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-base font-normal  rounded-lg hover:bg-sideBarHover">
                                <i className="fa-solid fa-file"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">Files</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-sideBarHover">
                                <i className="fa-solid fa-link"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">Common</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/recovery" className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-sideBarHover">
                                <i className="fa-solid fa-arrows-rotate"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">Recovery</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-sideBarHover">
                                <i className="fa-solid fa-gear"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <div 
                            className="flex items-center p-2 text-base cursor-pointer font-normal rounded-lg hover:bg-sideBarHover"
                            onClick={handleLogout}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
        
        </>
    );
}
 
export default Navigation;