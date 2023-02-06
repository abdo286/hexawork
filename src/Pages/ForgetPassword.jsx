import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputText from "../Components/form/InputText";
import { resetPassword, signInUser } from "../services/Firebase";
import LibrarySignIn from "../images/library_signIn.avif";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Fill All the Fields");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Email was sent");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const logingUsingDemoApp = async () => {
    try {
      await signInUser("james@gmail.com", "protraedi");
      setEmail("");
      toast.success("Signed in successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forget Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 h-96 object-cover">
          <img
            src={LibrarySignIn}
            alt="key"
            className="w-full rounded-2xl h-full"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <InputText
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 ">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mb-8"
              type="submit"
            >
              Send Reset Email
            </button>
            <button
              className="w-full bg-[#93c5fd] text-white px-7 py-3 text-sm font-medium captilize rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="button"
              onClick={logingUsingDemoApp}
            >
              Demo App
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
