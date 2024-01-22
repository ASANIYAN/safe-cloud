import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import PasswordToggle from "../../Hooks/PasswordToggle";
import { SuccessToast } from "../../toast/toasts";

const Login = () => {
  const [passwordInputType, visibility, setVisibility] = PasswordToggle();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginPasswordRef = useRef();
  const loginEmailRef = useRef();
  const { login, logInWithGoogle } = useAuth();

  const handleLoginSubmission = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(loginEmailRef.current.value, loginPasswordRef.current.value);
      SuccessToast("log in successful");
      navigate("/");
    } catch (error) {
      // console.log(error);
      let errorMessage = error.message
        .replace("Firebase:", "")
        .replaceAll("-", " ");
      const forwardSlashIndex = errorMessage.indexOf("/");
      const closeParenthesesIndex = errorMessage.indexOf(")");
      errorMessage = errorMessage.slice(
        forwardSlashIndex + 1,
        closeParenthesesIndex
      );
      setError(errorMessage);
    }
    setLoading(false);
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logInWithGoogle();
      SuccessToast("log in successful");
      navigate("/");
    } catch (error) {
      let errorMessage = error.message
        .replace("Firebase:", "")
        .replaceAll("-", " ");
      const forwardSlashIndex = errorMessage.indexOf("/");
      const closeParenthesesIndex = errorMessage.indexOf(")");
      errorMessage = errorMessage.slice(
        forwardSlashIndex + 1,
        closeParenthesesIndex
      );
      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-14">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-center text-3xl text-black">Login</h1>
        {error && (
          <div
            className="bg-red-100 rounded-lg py-2 px-6 mb-3 mt-4 text-base text-red-700 text-center"
            role="alert"
          >
            {error}
          </div>
        )}
        <form onSubmit={handleLoginSubmission} className="mt-10">
          <div className="mt-6">
            <label htmlFor="email" className="text-gray-400 text-sm block">
              E-mail address
            </label>
            <input
              ref={loginEmailRef}
              type="email"
              name="email"
              className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-3 pl-3 text-lg"
              required
              placeholder="Type your e-mail"
            />
          </div>
          <div className="mt-6">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-gray-400 text-sm ">
                Password
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-googleBtnText">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="relative">
              <input
                ref={loginPasswordRef}
                type={passwordInputType}
                className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-2 pl-3 text-lg"
                required
                placeholder="Type password"
              />
              <span className="password-toggle-icon mt-4 absolute right-2">
                <i
                  className={`fa-solid cursor-pointer ${
                    visibility ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setVisibility((visibility) => !visibility)}
                ></i>
              </span>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-progressbar w-full rounded text-white h-10"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="bg-goggleBtnBg w-full rounded h-10 border-2 border-gray-100"
          >
            <i className="fa-brands fa-google pr-3"></i>
            <span className="text-googleBtnText">Login with Google</span>
          </button>
        </div>
        <p className="text-center pt-4">
          Don't have an account? Click{" "}
          <Link to="/info" className="text-googleBtnText">
            {" "}
            here{" "}
          </Link>{" "}
          to Create one.
        </p>
      </div>
    </div>
  );
};

export default Login;
