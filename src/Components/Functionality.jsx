import CommentIcon from "@mui/icons-material/Comment";

const Functionality = ({ img, title, number }) => {
  return (
    <div className="functionality w-80 p-4">
      <img src={img} alt={title} className="max-w-full mb-4" />
      <div className="title flex flex-row-reverse justify-center items-center">
        <h3 className="ml-4 text-2xl font-bold">{title}</h3>
        <div className="icon relative">
          <CommentIcon className="!text-purple-700 !text-2xl" />
          <span className="absolute left-1/3 top-0 text-white">
            {number + 1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Functionality;
