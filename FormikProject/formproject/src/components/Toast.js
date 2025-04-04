import React, { useEffect } from "react";
import "../App.css";
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Mesajın 3 saniye sonra kapanmasını sağla
    }, 2000);

    return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
  }, [message, onClose]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
