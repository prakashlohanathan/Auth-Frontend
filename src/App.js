import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotReset from "./Pages/ForgotReset";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ForgotReset />} />
      </Routes>
    </div>
  );
}

export default App;
