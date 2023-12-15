import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import { tokens } from "../../themes";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("judge");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const data = { email, password, role };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:64000/login/" + role;
    const res = await axios.post(url, data);

    if (res.data.status === "Success") {
      navigate("/" + role);
    } else {
      alert("Invalid Credentialsss");
      navigate("/login");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        className="outer-div"
        style={{
          display: "flex",
          justifyItems: "center",
          marginBlock: "auto",
          height: "100vh",
        }}
      >
        <div
          className="inner-div"
          style={{
            border: "1px solid black",
            display: "flex",
            width: "30%",
            margin: "auto",
            padding: "20px",
            justifyContent: "center",
            borderRadius: "10px",
            height: "50vh",
          }}
        >
          <div
            className="inner-items"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "50vh",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <div
              className="switch-buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <button
                style={{
                  display: "flex",
                  background: "white",
                  borderRadius: "8px",
                }}
                onClick={() => setRole("judge")}
              >
                Judge
              </button>
              <button
                style={{
                  display: "flex",
                  background: "white",
                  borderRadius: "8px",
                }}
                onClick={() => setRole("registrar")}
              >
                Registrar
              </button>
              <button
                style={{
                  display: "flex",
                  background: "white",
                  borderRadius: "8px",
                }}
                onClick={() => setRole("client")}
              >
                Client
              </button>
            </div>
            <div
              className="roles"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h4" justifySelf="center">
                {" "}
                {role}
              </Typography>
            </div>

            <input
              name="remember"
              type="text"
              value={email}
              required="true"
              className="username"
              style={{
                padding: "10px",
                margin: "10px",
                display: "flex",
                width: "90%",
                borderRadius: "10px",
                marginTop: "auto",
              }}
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              value={password}
              className="username"
              required="true"
              style={{
                padding: "10px",
                margin: "10px",
                display: "flex",
                width: "90%",
                borderRadius: "10px",
              }}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div style={{ display: "flex" }}>
              <button
                className="submit"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
                type="text"
                style={{
                  width: "50%",
                  margin: "auto",
                  height: "2rem",
                  borderRadius: "10px",
                  backgroundColor: "lightblue",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}