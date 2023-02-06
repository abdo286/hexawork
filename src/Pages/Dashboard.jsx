// import { useNavigate } from "react-router-dom";
import { Categories, Searchbar } from "../Components";

const Dashboard = () => {
  // const navigate = useNavigate();
  return (
    <>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-20"
      >
        <path
          fill="#3f5563cd"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,106.7C274.3,117,343,203,411,202.7C480,203,549,117,617,85.3C685.7,53,754,75,823,106.7C891.4,139,960,181,1029,197.3C1097.1,213,1166,203,1234,192C1302.9,181,1371,171,1406,165.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg> */}
      <div className="min-h-[60vh] relative top-28 pr-20 mb-32">
        {/* <div className="flex justify-center right-[5%] absolute top-[0.2%]">
          <p
            className="bg-gray-700 text-white px-5 py-1 rounded-md cursor-pointer z-[50000]"
            onClick={() => navigate("/add-category")}
          >
            Add Category
          </p>
        </div> */}
        <Searchbar />
        <Categories />
      </div>
    </>
  );
};

export default Dashboard;
