import { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAppContext } from "../context/AppContext";
import * as Yup from "yup";
import { TextIAreaInput, TextInput } from "../Components/form";
import { GoCloudUpload } from "react-icons/go";
import loadingSVG from "../images/loading.svg";
import { Document, Page, pdfjs } from "react-pdf";
import { Languages as LanguagesData } from "../constants/Languages ";
import { MdDelete } from "react-icons/md";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { AddBookToFireStore } from "../services/Firebase";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FormattedLanguagesData = LanguagesData.map((cur) => ({
  value: cur.toLowerCase(),
  label: cur.toUpperCase(),
}));

const labels = [];

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let { categories: categoriesData } = useAppContext();
  const categories = useMemo(() => {
    return categoriesData.map((cur) => ({
      value: cur.name.toLowerCase(),
      label: cur.name.toUpperCase(),
    }));
  }, [categoriesData]);
  const rates = [1, 2, 3, 4, 5];
  const [language, setLanguage] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedAuthorsNames, setSelectedAuthorsNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingImage, setLoadingImage] = useState(false);
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      pdfLink: "",
      createdAt: new Date(),
      rating: 1,
      imageSrc: "",
    },
    onSubmit: async () => {
      if (!formik.isValid && !language && !category) {
        toast.error("Fill All the Fields");
        return;
      }
      try {
        const newSelectedLables = selectedLabels.map((cur) => cur.value);
        const newSelectedAuthorsNames = selectedAuthorsNames.map(
          (cur) => cur.value
        );
        console.log(language, category);
        await AddBookToFireStore(
          {
            ...formik.values,
            language: language.value,
            category: category.value.toLowerCase(),
            labels: newSelectedLables,
            id: nanoid(),
            authorsNames: newSelectedAuthorsNames,
          },
          user.id
        );
        toast.success("Book Added Successfully");
        formik.resetForm();
        setSelectedLabels([]);
        setSelectedAuthorsNames([]);
        // setLanguage(null);
        // setCategory(null);
      } catch (error) {
        toast.error("There was an Error");
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      imageSrc: Yup.string().required("image is required"),
      description: Yup.string().required("description is required"),
      pdfLink: Yup.string().required("pdf Link is required"),
      rating: Yup.number().required().positive().integer(),
    }),
  });

  const uploadImage = (e) => {
    setLoadingImage(true);
    const imageFile = e.target.files[0];
    const storage = getStorage();
    const imageRef = ref(storage, `${user.id}/Images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {},
      (error) => {
        setLoadingImage(false);
        toast.error("There was an Error");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoadingImage(false);
          formik.setFieldValue("imageSrc", downloadURL);
          toast.success("Image Uploaded Successfully");
        });
      }
    );
  };

  const deleteImage = async () => {
    setLoadingImage(true);
    const storage = getStorage();
    const imageRef = ref(storage, formik.values.imageSrc);
    try {
      await deleteObject(imageRef);
      setLoadingImage(false);
      formik.setFieldValue("imageSrc", "");
      toast.success("Image deleted Successfully");
    } catch (error) {
      setLoadingImage(false);
      toast.error("There was an Error");
      console.log(error);
    }
  };

  const deleteFile = async () => {
    setLoading(true);
    const storage = getStorage();
    const imageRef = ref(storage, formik.values.pdfLink);
    try {
      await deleteObject(imageRef);
      setLoading(false);
      formik.setFieldValue("pdfLink", "");
      toast.success("File deleted Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("There was an Error");
      console.log(error);
    }
  };

  const uploadFile = (e) => {
    setLoading(true);
    const pdfFile = e.target.files[0];
    const storage = getStorage();
    const fileRef = ref(storage, `${user.id}/books/${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(fileRef, pdfFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        setLoading(false);
        toast.error("There was an Error");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          formik.setFieldValue("pdfLink", downloadURL);
          formik.setFieldValue("pdfLink", downloadURL);
          toast.success("File Uploaded Successfully");
        });
      }
    );
  };

  return (
    <>
      <div className="flex relative !mb-36 !pb-0 flex-col items-center justify-center !bg-transparent py-8">
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
        <h3>Add New Book</h3>
        <form
          className="w-fit relative z-100 min-w-[38rem] mt-16 !bg-white p-12 border-t-[4rem] border-t-[#0099ffde] border-solid border-2 shadow-2xl flex flex-col gap-8"
          onSubmit={formik.handleSubmit}
        >
          <TextInput
            type="text"
            placeholder="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
            onBlur={formik.handleBlur}
            error={
              formik.errors.title && formik.touched.title
                ? formik.errors.title
                : null
            }
          />
          <TextIAreaInput
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            onBlur={formik.handleBlur}
            rows={3}
            error={
              formik.errors.description && formik.touched.description
                ? formik.errors.description
                : null
            }
          />
          <Select
            defaultValue={category}
            onChange={setCategory}
            options={categories}
            placeholder="Select..."
          />
          <Select
            defaultValue={language}
            onChange={setLanguage}
            options={FormattedLanguagesData}
            placeholder="Select..."
          />
          <CreatableSelect
            isClearable
            defaultValue={selectedLabels}
            options={labels}
            onChange={setSelectedLabels}
            isMulti={true}
            placeholder="labels"
          />
          <CreatableSelect
            isClearable
            defaultValue={selectedAuthorsNames}
            options={labels}
            onChange={setSelectedAuthorsNames}
            isMulti={true}
            placeholder="Authors Names"
          />

          <div className="mt-6 mb-12">
            <p className="font-semibold text-lg">Your Rate to this book</p>
            <div className="flex gap-3 mt-6">
              {rates.map((cur) => {
                if (cur <= formik.values.rating)
                  return (
                    <BsFillStarFill
                      key={cur}
                      className="text-3xl cursor-pointer text-yellow-300"
                      onClick={() => {
                        formik.setFieldValue("rating", cur);
                      }}
                    />
                  );
                else
                  return (
                    <BsStar
                      key={cur}
                      className="text-3xl cursor-pointer bg-white"
                      onClick={() => {
                        formik.setFieldValue("rating", cur);
                      }}
                    />
                  );
              })}
            </div>
          </div>
          {loading ? (
            <div className="mb-6">
              <div className="bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <div>
                  <img src={loadingSVG} alt="loading" className="h-24" />
                </div>
              </div>
            </div>
          ) : formik.values.pdfLink ? (
            <div className="relative">
              <Document
                className="mb-6"
                file={!loading ? formik.values.pdfLink : null}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <MdDelete
                className="absolute cursor-pointer -top-0 text-red-500 text-3xl -right-8"
                onClick={deleteFile}
              />
              <div>
                <div className="flex justify-center mb-12">
                  <p className="font-semibold">
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={() =>
                      setPageNumber((prevPageNumber) => prevPageNumber - 1)
                    }
                    className="font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={() =>
                      setPageNumber((prevPageNumber) => prevPageNumber + 1)
                    }
                    className="font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="flex justify-center items-center flex-col w-full h-32 gap-6 font-semibold cursor-pointer mb-6">
                <input
                  type="file"
                  className="hidden"
                  name="uploadingImage"
                  accept="application/pdf"
                  id="image"
                  onChange={uploadFile}
                />
                <span>Upload Book Pdf</span>
                <GoCloudUpload className="text-2xl" />
              </label>
            </div>
          )}

          {loadingImage ? (
            <div className="mb-6">
              <div className="bg-gray-500 bg-opacity-50 flex items-center justify-center  z-50">
                <div>
                  <img src={loadingSVG} alt="loading" className="h-24 " />
                </div>
              </div>
            </div>
          ) : formik.values.imageSrc ? (
            <div className="flex justify-center relative items-center mb-6  max-w-[20rem]">
              <img
                src={formik.values.imageSrc}
                alt=""
                className="h-full w-full object-cover"
              />
              <MdDelete
                className="absolute cursor-pointer -top-6 text-red-500 text-3xl -right-8"
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

          <div className="flex items-center justify-between">
            <button
              disabled={formik.isSubmitting}
              type="button"
              to="/"
              className="cursor-pointer !mt-8 !mr-8 px-5 py-1 rounded-md border-2 border-gray-500"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`cursor-pointer ${
                (!formik.isValid ||
                  !formik.dirty ||
                  loading ||
                  loadingImage ||
                  formik.isSubmitting) &&
                "!bg-blue-300 hover:!bg-blue-300"
              } !mt-8 bg-blue-500 text-white px-5 py-1 rounded-md hover:bg-blue-600 transition-background duration-100`}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                formik.isSubmitting ||
                loading ||
                loadingImage
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBook;
