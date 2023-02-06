import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && !!meta.error;

  return (
    <div className={`${error ? "bg-red-300" : null}`}>
      <label>{label}</label>
      <input {...field} {...props} />
      {error ? <p className="text-red-500">{meta.error}</p> : null}
    </div>
  );
};

export default MyTextInput;
