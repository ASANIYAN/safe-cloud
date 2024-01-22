import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle((toggle) => !toggle);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto mt-2 container">
        <Link to="/landing" className="flex items-center">
          <i className="fa-solid fa-cloud-arrow-down text-xl text-googleBtnText"></i>
          <span className="pl-2 font-semibold"> Safecloud </span>
        </Link>
        {toggle ? (
          <i
            onClick={handleToggle}
            className="fa-solid fa-x p-2 ml-3 text-md text-googleBtnText md:hidden"
          ></i>
        ) : (
          <button
            onClick={handleToggle}
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-googleBtnText rounded-lg md:hidden"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        <div
          className={`${
            toggle ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all ease-in`}
          id="mobile-menu"
        >
          <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <Link
              to="/login"
              className="text-googleBtnText border border-googleBtnText hover:text-white hover:bg-googleBtnText text-center font-semibold py-2.5 px-7 rounded"
            >
              Log in
            </Link>
            <Link
              to="/info"
              className="bg-progressbar border border-progressbar text-white font-semibold text-center py-2.5 px-7 hover:bg-white hover:text-progressbar rounded mt-4 md:mt-0"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
