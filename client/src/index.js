import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Judge from "./Judge";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Scenes/Login/login";
import Client from "./Clients";
import ClientRegister from "./Register/register";
import HomePage from "./Scenes/HomePage/HomePage";
import Registrar from "./Registrars";
import AdminRegister from "./Register/admin-register/admin-register";
import SetPassword from "./Components/set-password/set-password";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/judge/*" element={<Judge/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/client/*" element={<Client/>} />
        <Route path="/registrar/*" element={<Registrar/>} />
        <Route path="/client-register" element={<ClientRegister/>} />
        <Route path="/admin-register" element={<AdminRegister/>} />
        <Route path="/set-password" element={<SetPassword />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
