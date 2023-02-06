import { nanoid } from "nanoid";

const SelectInput = ({
  placeholder, 
  value,
  onChange,
  name,
  onBlur,
  error,
  categories,
}) => {
  let options = categories.map((category) => ({
    key: nanoid(),
    value: category,
    text: category.toUpperCase(),
  }));

  options = [
    {
      text: placeholder,
      value: "",
      key: nanoid(),
    },
    ...options,
    {
      text: "else",
      value: "else",
      key: nanoid(),
    },
  ];

  return (
    <div>
      <select
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        className={`${error && "!bg-red-50"} `}
      >
        {options.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.text}
            </option>
          );
        })}
        );
      </select>

      {error && (
        <div className="error border border-spacing-1 w-min whitespace-nowrap px-6 mt-1 border-red-600 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
export default SelectInput;
