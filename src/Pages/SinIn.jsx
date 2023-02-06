import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputText from "../Components/form/InputText";
import { signInUser } from "../services/Firebase";
import LibrarySignIn from "../images/library_signIn.avif";

const initialState = {
  email: "",
  password: "",
};
const SinIn = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Fill All the Fields");
      return;
    }

    try {
      setIsSigningIn(true);
      await signInUser(formData.email, formData.password);
      setFormData(initialState);
      toast.success("Signed in successfully");
      setIsSigningIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsSigningIn(false);
    }
  };
  //     test account
  // back in each page
  // change project name
  // favorite // consitant design using variables and same colors
  // change password
  const logingUsingDemoApp = async () => {
    try {
      setIsSigningIn(true);
      await signInUser("james@gmail.com", "protraedi");
      setFormData(initialState);
      toast.success("Signed in successfully");
      setIsSigningIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsSigningIn(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
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
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative mb-6">
              <InputText
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3  top-3  text-xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3  top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
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
                  to="/forget-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot password
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mb-8"
              type="submit"
              disabled={isSigningIn}
            >
              Sign in
            </button>
            {/* <div className="flex my-4 items-center before:border-t before:flex-1 before:border-gray-300   after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-3">OR</p>
            </div> */}
            <button
              className="w-full bg-[#93c5fd] text-white px-7 py-3 text-sm font-medium captilize rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="button"
              onClick={logingUsingDemoApp}
              disabled={isSigningIn}
            >
              Demo App
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SinIn;
