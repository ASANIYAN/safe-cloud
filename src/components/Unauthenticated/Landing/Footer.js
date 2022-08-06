import { Link } from "react-router-dom";

const Footer = () => {
    return (
    <footer className="p-4 bg-googleBtnText md:flex md:items-center md:justify-between md:p-6 mt-10">
        <div className="flex flex-col md:flex-row mt-6">
            <p 
            className="text-white text-center text-xl pb-8">©2022 
            <Link to="/landing" className="hover:underline pl-3">Safecloud™</Link>.
            </p>
            <p className="text-white text-center text-xl pb-8 pl-0 md:pl-4">
                All Rights Reserved.
            </p>    
        </div>
        <div className="flex flex-wrap justify-evenly items-center mt-3 text-xl text-white sm:mt-0 pb-8 pt-2 md:pt-6">
            <i className="fa-brands fa-whatsapp md:mr-6"></i>
            <i className="fa-brands fa-twitter md:mr-6"></i>
            <i className="fa-brands fa-linkedin md:mr-6"></i>
        </div>
    </footer>
    );
}
 
export default Footer;