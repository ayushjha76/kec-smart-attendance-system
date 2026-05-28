import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      const user = response.data.user;
      localStorage.setItem(
        "token",
       response.data.token
      );

        localStorage.setItem(
        "role",
        user.role
      );

       
      if (response.data.success) {

        alert("Login Successful");

        if (user.role === "teacher") {
          navigate("/teacher");
        }

        else if (
          user.role === "student"
        ) {
          navigate("/student");
        }

        else if (user.role === "admin") {
          navigate("/admin");
        }

      }

    } catch (error) {

      alert("Invalid Email or Password");

    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow:
            "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Smart Attendance
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={inputStyle}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={inputStyle}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={loginButton}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const loginButton = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Login;