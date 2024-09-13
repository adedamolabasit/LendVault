import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/Home/Index";
import { SubDashboard } from "./page/Dashboard/SubDashboard";
import Dashboard from "./page/Dashboard/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<SubDashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
