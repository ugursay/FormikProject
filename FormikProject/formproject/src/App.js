import "./App.css";
import { Routes, Route } from "react-router-dom";
import GeneralForm from "./components/GeneralForm";
import PortalForm from "./components/PortalForm";
import DataDisplay from "./components/DataDisplay";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GeneralForm />} />
        <Route path="/portal" element={<PortalForm />} />
        <Route path="/datas" element={<DataDisplay />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
