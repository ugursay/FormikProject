import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import Toast from "./Toast";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [cancelUpdate, setCancelUpdate] = useState(false);

  // const [formData, setFormData] = useState({
  //   email: "",
  //   age: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const onSubmit = async (values) => {
    try {
      console.log(isSubmitting);
      await axios.put(`http://localhost:5000/users/${id}`, values);
      if (!cancelUpdate) {
        setMessage("Veriler güncellendi");
        setShowToast(true);
        setTimeout(() => {
          navigate("/datas");
        }, 700);
      }
    } catch (error) {
      console.error("güncelleme başarısız oldu", error);
      setMessage("Veriler güncellenemedi");
      setShowToast(true);
    }
  };

  const {
    values,
    setValues,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
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

  useEffect(() => {
    console.log(isSubmitting);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setValues(response.data);
      } catch (error) {
        console.error("Kullanıcı verisi alınamazdı:", error);
      }
    };
    fetchUser();
  }, [id]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(`http://localhost:5000/users/${id}`, formData);
  //     navigate("/datas");
  //   } catch (error) {
  //     console.error("Güncelleme başarısız oldu:", error);
  //   }
  // };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2 className="dataHead">Kullanıcı Güncelle</h2>
        <div className="inputDiv">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <div className="error">{errors.email}</div>
          )}
        </div>

        <div className="inputDiv">
          <label>Age</label>
          <input
            type="age"
            name="age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.age && touched.age ? "input-error" : ""}
          />
          {errors.age && touched.age && (
            <div className="error">{errors.age}</div>
          )}
        </div>

        <div className="inputDiv">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <div className="error">{errors.password}</div>
          )}
        </div>

        <div className="inputDiv">
          <label>ConfirmPassword</label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
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

        <button type="submit" disabled={isSubmitting}>
          Güncelle
        </button>
        <button
          disabled={isSubmitting}
          onClick={() => {
            setCancelUpdate(true); // İptal işlemi başlatılıyor
            setMessage("Güncelleme iptal edildi");
            setShowToast(true);
            setTimeout(() => {
              navigate("/datas");
            }, 700);
          }}
        >
          İptal Et
        </button>

        {showToast && (
          <Toast message={message} onClose={() => setShowToast(false)} />
        )}
      </form>
    </div>
  );
}

export default EditUser;
