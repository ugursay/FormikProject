import React, { useState } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Link } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";

function GeneralForm() {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSubmit = async (values, actions) => {
    // console.log(values, actions);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // actions.resetForm();

    try {
      const response = await axios.post(`http://localhost:5000/users`, values);
      console.log("Veri başarıyla kaydedildi:", response.data);
      setMessage("Başarıyla kaydedildi!");
      setShowToast(true);

      actions.resetForm(); // Formu sıfırla
    } catch (error) {
      console.error("Veri kaydedilirken hata oluştu:", error);
      setMessage("Bir hata oluştu!");
      setShowToast(true);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  //   console.log(formik);
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputDiv">
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          id="email"
          placeholder="Mail adresinizi giriniz"
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <div className="error">{errors.email}</div>
        )}
      </div>
      <div className="inputDiv">
        <label>Yaş</label>
        <input
          type="number"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          id="age"
          placeholder="Yaşınızı giriniz giriniz"
          className={errors.age && touched.age ? "input-error" : ""}
        />
        {errors.age && touched.age && <div className="error">{errors.age}</div>}
      </div>
      <div className="inputDiv">
        <label>Şifre</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          id="password"
          placeholder="Şifrenizi giriniz"
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <div className="error">{errors.password}</div>
        )}
      </div>
      <div className="inputDiv">
        <label>Şifre Tekrar</label>
        <input
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          id="confirmPassword"
          placeholder="Şifrenizi tekrar giriniz"
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "input-error"
              : ""
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        Kaydet
      </button>

      {showToast && (
        <Toast
          message={message}
          onClose={() => setShowToast(false)} // Mesajı kapatmak için onClose fonksiyonunu kullan
        />
      )}

      <Link className="formLink" to="/Portal">
        Portal Forma Git
      </Link>
      <p></p>
      <Link className="formLink" to="/datas">
        Kayıtlara Git
      </Link>
    </form>
  );
}

export default GeneralForm;
