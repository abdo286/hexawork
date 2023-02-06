import React, { useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import loadingSVG from "../images/loading.svg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { AddCategoryToFireStore } from "../services/Firebase";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const AddCategory = () => {
  const initialState = {
    name: "",
    imageSrc: "",
  };

  const [category, setCategory] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const updateInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategory((category) => ({
      ...category,
      [name]: value,
    }));
  };

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storage = getStorage();
    const imageRef = ref(storage, `${user.id}/Images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {},
      (error) => {
        setLoading(false);
        toast.error("There was an Error");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setCategory((category) => ({
            ...category,
            imageSrc: downloadURL,
          }));
          toast.success("Image Uploaded Successfully");
        });
      }
    );
  };

  const deleteImage = async () => {
    setLoading(true);
    const storage = getStorage();
    const imageRef = ref(storage, category.imageSrc);
    try {
      await deleteObject(imageRef);
      setLoading(false);
      setCategory((category) => ({
        ...category,
        imageSrc: "",
      }));
      toast.success("Image deleted Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("There was an Error");
      console.log(error);
    }
  };

  const SaveData = async () => {
    if (!category.imageSrc || !category.name) {
      toast.error("Fill All the Fields");
      return;
    }
    try {
      await AddCategoryToFireStore(
        {
          ...category,
          id: nanoid(),
          to: category.name.toLowerCase(),
          name: category.name.toUpperCase(),
        },
        user.id
      );
      toast.success("category Saved Successfully");
      setCategory(initialState);
    } catch (error) {
      toast.error("There was an Error");
      console.log(error);
      setCategory(initialState);
    }
  };
  return (
    <div className="min-h-[55vh] h-auto mt-[5vh] pt-16 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-20"
      >
        <path
          fill="#0099ffa0"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,106.7C274.3,117,343,203,411,202.7C480,203,549,117,617,85.3C685.7,53,754,75,823,106.7C891.4,139,960,181,1029,197.3C1097.1,213,1166,203,1234,192C1302.9,181,1371,171,1406,165.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
      <div className="relative ">
        <div className="w-[80%] mx-auto flex justify-center">
          <form
            className={`border-2 px-8 py-8 mt-8 relative z-[100] bg-gray-400 text-white border-gray-300 p-4 mb-9 flex flex-col items-center gap-5 shadow-x`}
            onSubmit={(e) => e.preventDefault()}
            method="category  "
          >
            <div className="form-control add-category">
              <input
                type="text"
                value={category.name}
                name="name"
                onChange={updateInput}
                className="block py-1 rounded-md px-3 mt-2 border-rounded text-3 border-none outline-none bg-[#e9ecef] text-[#000]"
                id="name"
                placeholder="category name"
              />
            </div>
            {loading ? (
              <div className="mb-6">
                <div className="bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                  <div>
                    <img src={loadingSVG} alt="loading" className="h-24" />
                  </div>
                </div>
              </div>
            ) : category.imageSrc ? (
              <div className="flex justify-center max-w-[25rem] relative items-center mb-6 ">
                <img
                  src={category.imageSrc}
                  alt="category"
                  className="h-full w-full object-cover"
                />
                <MdDelete
                  className="absolute cursor-pointer -top-6 text-red-500 text-3xl -right-0"
                  onClick={deleteImage}
                />
              </div>
            ) : (
              <div>
                <label className="flex justify-center items-center flex-col w-full h-32 gap-6 font-semibold cursor-pointer mb-6">
                  <input
                    type="file"
                    className="hidden"
                    name="uploadingImage"
                    accept="image/"
                    id="image"
                    onChange={uploadImage}
                  />
                  <span>Upload Image</span>
                  <GoCloudUpload className="text-2xl" />
                </label>
              </div>
            )}
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-gray-600 border-none  px-1 rounded-md py-2 cursor-pointer tracking-wide hover:bg-gray-700 transition-background duration-75 ease-in-out"
                onClick={() => navigate("/")}
                type="button"
              >
                Cancel
              </button>
              <button
                className={`${
                  loading ? "hover:!bg-[#74c0fc]" : null
                } bg-[#74c0fc] border-none rounded-md px-3 py-2 cursor-pointer tracking-wide hover:bg-[#0a88e8cb] transition-background transition-text hover:text-white duration-75 ease-in-out`}
                onClick={SaveData}
                disabled={loading}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;