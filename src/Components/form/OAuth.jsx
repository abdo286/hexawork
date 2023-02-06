import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddUserToFireStore, signInWithGoogleAuthentication } from "../../services/Firebase";

const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      setLoading(true);
      const {
        user,
        _tokenResponse: { isNewUser },
      } = await signInWithGoogleAuthentication();
      if (isNewUser) {
        await AddUserToFireStore({
          email: user.email,
          docId: user.uid,
          photoURL: user.photoURL || null,
          name: user.displayName,
        });
        toast.success("Signed up successfully");
      } else toast.success("Sign in successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      disabled={loading}
      className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium  hover:text-red-800 active:bg-red-800 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-out rounded"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      Google
    </button>
  );
};

export default OAuth;
