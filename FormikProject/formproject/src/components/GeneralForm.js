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

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
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
          id="email"
          placeholder="Mail adresinizi giriniz"
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="inputDiv">
        <label>Yaş</label>
        <input
          type="number"
          value={values.age}
          onChange={handleChange}
          id="age"
          placeholder="Yaşınızı giriniz giriniz"
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          placeholder="Şifrenizi giriniz"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre Tekrar</label>
        <input
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
          placeholder="Şifrenizi tekrar giriniz"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
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
