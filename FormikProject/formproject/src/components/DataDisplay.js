import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "./Toast";

const DataDisplay = () => {
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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
      setTimeout(async () => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setMessage("Veriler Silindi");
        setShowToast(true);
        console.log("kullanıcı silindi", id);
        setUsers(users.filter((user) => user.id !== id));
      }, 700);
    } catch (error) {
      setTimeout(() => {
        console.error("silme işlemi başarısız oldu", error);
        setMessage("Veriler Silinemedi");
        setShowToast(true);
      }, 700);
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

        {showToast && (
          <Toast message={message} onClose={() => setShowToast(false)} />
        )}
      </div>
    </>
  );
};

export default DataDisplay;
