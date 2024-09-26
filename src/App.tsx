import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/Home/Index";
import { Navigator } from "./page/Dashboard/Navigator";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Navigator />} />
      </Routes>
    </Router>
  );
}

export default App;
