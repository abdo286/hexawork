import { useField } from "formik";
const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && !!meta.error;

  return (
    <div className={`${error ? "bg-red-300" : null}`}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {error ? <p className="text-red-500">{meta.error}</p> : null}
    </div>
  );
};

export default MyTextArea;
