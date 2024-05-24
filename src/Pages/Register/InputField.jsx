export const InputField = ({ id, label, type, formik, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={id}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[id]}
        className={`input-field-login ${
          formik.touched[id] && formik.errors[id] ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
      {formik.touched[id] && formik.errors[id] ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors[id]}</div>
      ) : null}
    </div>
  </div>
);
