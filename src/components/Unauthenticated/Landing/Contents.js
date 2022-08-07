import { Link } from "react-router-dom";
import homepage from "../../../assets/homepage.PNG";
import team from "../../../assets/team.svg";
import files from "../../../assets/files.svg";
import secure from "../../../assets/secure.svg";

const Contents = () => {
    return (
        <div className="container">
            
            <h1 className="text-3xl md:text-4xl text-center text-black mt-10 font-bold md:w-2/3 mx-auto">
                Simplify your work with convenient and secure cloud storage
            </h1>

            <div className="flex flex-col-reverse md:flex-row md:space-x-8 mt-16">
                
                <div className="flex-1">
                    <h2 className="text-center text-3xl font-semibold pt-10 mx-auto">
                        The secure cloud storage for you and your work group.
                    </h2>
                    <p className="text-gray-500 text-center mx-auto pt-6">
                        Safecloud is the cloud storage application. It provides work groups store, efficiently manage and keep files safe.
                    </p>
                    <div className="mt-8 text-center">
                        <Link to="/info"
                        className="bg-googleBtnText text-white font-bold text-center py-3.5 px-6 rounded "
                        >
                            Get started
                        </Link>
                    </div>
                </div>
                
                <div className="flex-1">
                    <div>
                        <img src={homepage} alt="homepage" className="w-full mx-auto" />
                    </div>
                </div>
            </div>
            
            <h3 className="mt-12 text-black text-2xl font-semibold mx-auto text-center">
                Simplify your work
            </h3>

            <div className="w-full mt-10 flex flex-col md:flex-row md:space-x-8">

                <div className="flex-1 mt-10 md:mt-14">
                    <div className="">
                        <img src={team} alt="team" width="250" height="200" className="mx-auto" />
                    </div>
                    <h3 className="text-center text-xl text-black font-semibold">
                        Teamwork anywhere
                    </h3>
                    <p className="text-gray-500 text-center">
                        You can work with files anywhere and anytime.
                    </p>
                </div>

                <div className="flex-1 mt-10 md:mt-8">
                    <div className="">
                        <img src={files} alt="team" width="250" height="200" className="mx-auto" />
                    </div>
                    <h3 className="text-center text-xl text-black font-semibold">
                        The right files at hand
                    </h3>
                    <p className="text-gray-500 text-center">
                        The homepage displays the most frequently used and recently added files and folders.
                    </p>
                </div>

                <div className="flex-1 mt-10 md:mt-0">
                    <div className="">
                        <img src={secure} alt="team" width="250" height="200" className="mx-auto" />
                    </div>
                    <h3 className="text-center text-xl text-black font-semibold">
                        Keep all files safe
                    </h3>
                    <p className="text-gray-500 text-center mx-auto">
                        Thanks to end-to-end encryption and security settings, you don't need to worry about the security of your files.
                    </p>
                </div>

            </div>
        </div>
    );
}
 
export default Contents;