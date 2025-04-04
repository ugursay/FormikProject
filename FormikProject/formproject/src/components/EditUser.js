import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Kullanıcı verisi alınamazdı:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, formData);
      navigate("/datas");
    } catch (error) {
      console.error("Güncelleme başarısız oldu:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleUpdate}>
        <h2>Kullanıcı Güncelle</h2>
        <div className="inputDiv">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="inputDiv">
          <label>Yaş</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="inputDiv">
          <label>Şifre</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="inputDiv">
          <label>Şifre Tekrar</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}

export default EditUser;
