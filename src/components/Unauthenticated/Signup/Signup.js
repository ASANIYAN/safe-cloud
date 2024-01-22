import { Link } from "react-router-dom";
import Progressbar from "../../Hooks/Progressbar";

const Signup = ({ children }) => {
  return (
    <>
      <div className="mt-3">
        <Link to="/landing" className="flex items-center">
          <i className="fa-solid fa-cloud-arrow-down text-xl text-googleBtnText"></i>
          <span className="pl-2 font-semibold"> Safecloud </span>
        </Link>
      </div>
      <Progressbar />
      {children}
    </>
  );
};

export default Signup;
