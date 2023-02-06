import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signOutUser } from "../services/Firebase";

const SignedMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed Out Successfully");
      setShowMenu(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <menu className="relative flex justify-center">
      <div
        className="w-8 h-8 cursor-pointer"
        tabindex="0"
        onClick={() => setShowMenu((showMenu) => !showMenu)}
      >
        <img
          src="https://images.unsplash.com/photo-1667034243270-f45eef3d1ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full rounded-[300rem]"
        />
      </div>
      <ul
        className={` ${
          !showMenu ? "h-0 invisible" : null
        } triangle  bg-gray-600 transition duration-300 ease-in-out text-white mt-3 px-3 py-1 absolute top-9  rounded`}
      >
        <li className="whitespace-nowrap" onClick={() => setShowMenu(false)}>
          <Link to="/account">Account</Link>
        </li>
        {/* <li className="whitespace-nowrap" onClick={() => setShowMenu(false)}>
          <Link to={`/profile/${user.uid}`}>Profile</Link>
        </li> */}
        <li className="whitespace-nowrap">
          <button
            className={`block !py-1 text-sm font-semibold text-white border-b-[3px] border-b-transparent`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </menu>
  );
};

export default SignedMenu;
