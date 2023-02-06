import { useState } from "react";
import useAuthListener from "../hooks/useAuthListener";
import InputText from "../Components/form/InputText";
import { toast } from "react-toastify";
import {
  UpdateFireStoreUserData,
  updateUserProfile,
} from "../services/Firebase";

const Account = () => {
  const { user } = useAuthListener();
  const [name, setName] = useState(user?.displayName || "");
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    try {
      await updateUserProfile({ displayName: name });
      await UpdateFireStoreUserData({ name, docId: user.uid });
      setEdit(false);
      toast.success("Name has been updated successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative top-36 mb-80">
        <div>
          <p className="md:w-1/2"></p>
          {edit ? (
            <form
              onSubmit={handleSubmit}
              className="px-2 flex flex-col justify-center items-center mt-6"
            >
              <InputText
                type="text"
                name="name"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                classes="md:w-1/3 border-2 border-gray-300"
              />
              <InputText
                type="text"
                name="email"
                placeholder="Email"
                value={user?.email || ""}
                classes="md:w-1/3  border-2 border-gray-300"
                disabled={true}
              />
              <button
                className="w-full md:w-1/3 bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md  hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Submit
              </button>
            </form>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="px-2 flex flex-col justify-center items-center  mt-6"
              >
                <InputText
                  type="text"
                  name="name"
                  placeholder="Full name "
                  value={name}
                  classes="md:w-1/3 border-2 border-gray-300"
                  disabled={true}
                />
                <InputText
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={user?.email || ""}
                  classes="md:w-1/3  border-2 border-gray-300 mb-12"
                  disabled={true}
                />
              </form>
              <p className="font-semibold text-center">
                Do you want to change your name ?{" "}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-600 active:text-red-600 "
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
