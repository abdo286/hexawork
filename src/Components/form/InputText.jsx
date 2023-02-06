const InputText = ({ name, classes, ...props }) => {
  return (
    <input
      autoComplete="true"
      className={`w-full px-4  ${name === "password" ? null : "mb-6"} py-2 ${
        classes ? classes : "border-2 border-gray-200"
      } text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out `}
      name={name}
      {...props}
    />
  );
};

export default InputText;
