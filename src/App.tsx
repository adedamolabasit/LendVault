import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/Home/Index";
import { SubDashboard } from "./page/Dashboard/SubDashboard";
import Vault from "./page/Dashboard/Vault";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<SubDashboard />} />
        <Route path="/Dashboard" element={<Vault />} />
      </Routes>
    </Router>
  );
}

export default App;
