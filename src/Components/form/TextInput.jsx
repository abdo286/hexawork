const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  onBlur,
  error,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        onBlur={onBlur}
        className={`border-2  border-gray-300 px-3 py-1 rounded-md min-w-full focus:outline-[#3b83f6] ${
          error && "!bg-red-50"
        }`}
      />
      {error && (
        <div className="error rounded-lg  border border-spacing-1 w-min whitespace-nowrap px-6 mt-1 border-red-600 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
