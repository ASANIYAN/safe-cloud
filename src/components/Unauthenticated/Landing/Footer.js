import { Link } from "react-router-dom";

const Footer = () => {
    return (
    <footer className="p-4 bg-googleBtnText md:flex md:items-center md:justify-between md:p-6 mt-10">
        <span className=" text-white sm:text-center text-xl pb-8 pt-6">© 2022 <Link to="/landing" className="hover:underline">Safecloud™</Link>. All Rights Reserved.
        </span>
        <div className="flex flex-wrap items-center mt-3 text-xl text-white sm:mt-0 pb-8 pt-6">
            <i className="fa-brands fa-whatsapp md:mr-6"></i>
            <i className="fa-brands fa-twitter md:mr-6"></i>
            <i className="fa-brands fa-linkedin md:mr-6"></i>
        </div>
    </footer>
    );
}
 
export default Footer;