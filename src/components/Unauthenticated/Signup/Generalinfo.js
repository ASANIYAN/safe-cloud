import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Generalinfo = () => {

    const { userData, setUserData, signInWithGoogle, setWidth } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setWidth('33.33');
    }, [])

    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    async function handleGoogleAuth(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/');
        } catch (error) {
            let errorMessage = error.message.replace("Firebase:", "").replaceAll("-", " ");
            const forwardSlashIndex = errorMessage.indexOf('/');
            const closeParenthesesIndex = errorMessage.indexOf(')');
            errorMessage = errorMessage.slice(forwardSlashIndex+1 ,closeParenthesesIndex);
            setError(errorMessage);
        }
    }

    const handleChange = (e) => {
        const {name, value } = e.target;
        setUserData({ ...userData, [name]: value });

    }
    
    function SubmitInfo(e) {
        e.preventDefault();
        navigate("/setpassword");
        
    }

    return (
        <>
            <div className="container mt-10">
                <div className="w-full max-w-md mx-auto">
                    <h1 className="text-center text-3xl text-black">
                        General info
                    </h1>
                        {
                            error && <div className="bg-red-100 rounded-lg py-2 px-6 mt-4 text-base text-red-700 mb-3 text-center" role="alert">
                            {error}
                        </div>
                        }
                    <form onSubmit={SubmitInfo} className="mt-10">
                        <div className="mt-6">
                            <label htmlFor="firstName" className="text-gray-400 text-sm block">First name</label>
                            <input 
                            type="text" 
                            name="firstName" 
                            onChange={handleChange} 
                            value={userData["firstName"]} 
                            className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-3 pl-3 text-lg" 
                            required 
                            placeholder="first name"
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="lastName" className="text-gray-400 text-sm block">Last name</label>
                            <input 
                            type="text" 
                            name="lastName" 
                            onChange={handleChange} 
                            value={userData["lastName"]} 
                            className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-3 pl-3 text-lg" 
                            required 
                            placeholder="last name"
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="text-gray-400 text-sm block">E-mail address</label>
                            <input 
                            type="email" 
                            name="email" 
                            onChange={handleChange} 
                            value={userData["email"]} 
                            className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-3 pl-3 text-lg"  
                            required 
                            placeholder="Type your e-mail"
                            />
                        </div>
                        <div className="mt-8">
                            <button 
                            type="submit" 
                            className="bg-progressbar w-full rounded text-white h-10"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <button 
                        disabled={loading}
                        onClick={handleGoogleAuth}
                        className="bg-goggleBtnBg w-full rounded h-10 border-2 border-gray-100"
                        >
                            <i className="fa-brands fa-google pr-3"></i>
                            <span className="text-googleBtnText">
                                Continue with Google
                            </span>
                        </button>
                    </div>
                    <p className="text-center pt-4">
                        Already have an account? Click <Link to="/login" className="text-googleBtnText"> here </Link> to Log in.
                    </p>

                </div>
            </div>
        </>
    );
}
 
export default Generalinfo;