import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/Home/Index";
import { SubDashboard } from "./components/Dashboard/SubDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<SubDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
