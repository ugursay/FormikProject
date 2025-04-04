import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataDisplay = () => {
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Veriyi JSON Server'dan alıyoruz
        const response = await axios.get(`http://localhost:5000/users`);
        setUsers(response.data); // Veriyi state'e kaydediyoruz
        console.log(response);
        setLoading(false); // Yükleme işlemi bitti
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
        setLoading(false); // Hata durumunda da yükleme bitti
      }
    };

    fetchUsers(); // Veriyi çekmek için fonksiyonu çağırıyoruz
  }, []); // Component mount olduğunda çalışacak

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      console.log("kullanıcı silindi", id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("silme işlemi başarısız oldu", error);
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <>
      <div className="dataDisplayMain">
        <div className="dataHead">
          <h2>Kullanıcılar:</h2>
        </div>
        <div className="datas">
          {users.map((user) => (
            <div className="data" key={user.id}>
              <div>Email: {user.email}</div>
              <div>Yaş: {user.age}</div>
              <div>Şifre: {user.password}</div>
              <div>Şifre Tekrar: {user.confirmPassword}</div>
              <hr />
              <button
                className="formLink"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Sil
              </button>

              <Link className="formLinkDisplay" to={`/edit/${user.id}`}>
                Güncelle
              </Link>
            </div>
          ))}
        </div>
        <div className="dataDisplayLink">
          <Link className="formLinkDisplay" to="/">
            Ana forma Git
          </Link>
        </div>
      </div>
    </>
  );
};

export default DataDisplay;
