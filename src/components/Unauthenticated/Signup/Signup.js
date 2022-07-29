import Progressbar from "../../Hooks/Progressbar";

const Signup = ({ children }) => {
    return (
        <>
            <div className="mt-3">
                <i className="fa-solid fa-cloud-arrow-down text-xl text-googleBtnText pl-40"></i>
                <span className="pl-2 font-semibold"> Safecloud </span>
            </div>
            <Progressbar />
            {
                children
            }
        </>
    );
}
 
export default Signup;