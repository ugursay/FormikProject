import { useField } from "formik";
import React from "react";

function CustomCheckbox({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="checkbox">
        <input
          {...field}
          {...props}
          className={meta.error ? "input-error" : ""}
        />
        <span>Kullanım koşullarını kabul ediyorum.</span>
      </div>

      {meta.error && <div className="error">{meta.error}</div>}
    </>
  );
}

export default CustomCheckbox;
