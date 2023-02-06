import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../Components/form/InputText";
import { toast } from "react-toastify";
import LibrarySignIn from "../images/library_signIn.avif";
import {
  AddUserToFireStore,
  createNewUser,
  signInUser,
  updateUserProfile,
} from "../services/Firebase";

const initialState = {
  email: "",
  password: "",
  name: "",
};
const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
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
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Fill All the Fields");
      return;
    }

    try {
      setIsSigningUp(true);
      const { user } = await createNewUser(
        formData.email,
        formData.password,
        formData.name
      );

      await updateUserProfile({ displayName: formData.name });
      await AddUserToFireStore({
        email: formData.email,
        id: user.uid,
        photoURL: "",
        name: formData.name,
      });
      toast.success("Signed up successfully");
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSigningUp(false);
    }
  };
  const logingUsingDemoApp = async () => {
    try {
      setIsSigningUp(true);
      await signInUser("james@gmail.com", "protraedi");
      setFormData(initialState);
      toast.success("Signed in successfully");
      setIsSigningUp(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsSigningUp(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
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
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
            />
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
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 ">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Login
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
              disabled={isSigningUp}
            >
              Sign up
            </button>
            <button
              className="w-full bg-[#93c5fd] text-white px-7 py-3 text-sm font-medium captilize rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="button"
              onClick={logingUsingDemoApp}
              disabled={isSigningUp}
            >
              Demo App
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
