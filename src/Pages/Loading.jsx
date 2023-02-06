import loadingSVG from "../images/loading.svg";

const Loading = () => {
  return (
    <div className=" bg-opacity-50 flex items-center justify-center absolute top-[50%] left-[50%]">
      <div>
        <img src={loadingSVG} alt="loading" className="h-24" />
      </div>
    </div>
  );
};

export default Loading;
