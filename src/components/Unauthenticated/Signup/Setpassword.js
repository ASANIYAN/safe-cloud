import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import PasswordStrengthMeter from "../../Hooks/PasswordStrengthMeter";
import PasswordToggle from "../../Hooks/PasswordToggle";
import { SuccessToast } from "../../toast/toasts";

const Setpassword = () => {
  const [
    passwordInputType,
    visibility,
    setVisibility,
    repeatInputType,
    repeatVisibility,
    setRepeatVisibility,
  ] = PasswordToggle();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, userData, setWidth } = useAuth();
  const email = userData.email;

  useEffect(() => {
    setWidth("66.66");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, passwordRef.current.value);
      // await addDocument({
      //     displayName: userData.firstName + " " + userData.lastName,
      //     email: userData.email
      // }, currentUser.uid);
      setWidth("100");
      SuccessToast("Account created successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // console.log(error);
      // console.log(error.code);
      // console.log(error.message);
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
  }

  return (
    <>
      <section className="container mt-10">
        <section className="w-full max-w-md mx-auto">
          <h1 className="text-center text-3xl text-black">
            Set a strong password
          </h1>
          {error && (
            <section
              className="bg-red-100 rounded-lg py-2 px-6 mt-6 text-base text-red-700 mb-2 text-center"
              role="alert"
            >
              {error}
            </section>
          )}
          <form onSubmit={handleSubmit} className="mt-8">
            <section className="mt-6">
              <label htmlFor="Password" className="text-gray-400 text-sm block">
                Password
              </label>
              <section className="relative">
                <input
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordInputType}
                  placeholder="Type password"
                  className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar focus:border-b-0 leading-2 pl-3 pr-8 text-lg"
                  required
                />
                <span className="password-toggle-icon mt-4 absolute right-2">
                  <i
                    className={`fa-solid cursor-pointer ${
                      visibility ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={() => setVisibility((visibility) => !visibility)}
                  ></i>
                </span>
              </section>
              <PasswordStrengthMeter password={password} />
            </section>

            <section className="mt-6">
              <label
                htmlFor="repeatPassword"
                className="text-gray-400 text-sm block"
              >
                Repeat password
              </label>
              <section className="relative">
                <input
                  ref={repeatPasswordRef}
                  type={repeatInputType}
                  className="border-2 border-gray-100 input h-10 w-full mt-2 focus:outline-none focus:border-progressbar leading-2 pl-3 text-lg"
                  required
                  placeholder="Repeat password"
                />
                <span className="password-toggle-icon mt-4 absolute right-2">
                  <i
                    className={`fa-solid cursor-pointer ${
                      repeatVisibility ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={() =>
                      setRepeatVisibility(
                        (repeatVisibility) => !repeatVisibility
                      )
                    }
                  ></i>
                </span>
              </section>
            </section>
            <section className="mt-8">
              <button
                type="submit"
                className="bg-progressbar w-full rounded text-white h-10"
                disabled={loading}
              >
                Submit
              </button>
            </section>
          </form>
        </section>
      </section>
    </>
  );
};

export default Setpassword;
