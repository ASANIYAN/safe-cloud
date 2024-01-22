import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="container mt-14">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-center text-3xl text-black">Password Reset</h1>
        {error && (
          <div
            className="bg-red-100 rounded-lg py-2 px-6 mb-3 mt-6 text-base text-red-700 text-center"
            role="alert"
          >
            {error}
          </div>
        )}
        {message && (
          <div
            className="p-4 mb-3 mt-6 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 text-center"
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={handlePasswordReset} className="mt-10">
          <div className="mt-6">
            <label htmlFor="email" className="text-gray-400 text-sm block">
              E-mail address
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-3 pl-3 text-lg"
              required
              placeholder="Type your e-mail"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-progressbar w-full rounded text-white h-10"
            >
              Reset Password
            </button>
          </div>
          <p className="text-center mt-4">
            <Link to="/login" className="text-googleBtnText text-xl">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
