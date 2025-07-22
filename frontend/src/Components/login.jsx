import React, { useState } from "react";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegename, setcollegename] = useState("");
  const [registrationid, setregistrationid] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("student"); // new state for role
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "http://localhost:3000/api/login";
    const payload = { username: name, password, role };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Redirect based on role
      if (data.role === "student") {
        navigate("/studentpage");
      } else if (data.role === "mentor") {
        navigate("/mentor");
      } else if (data.role === "admin") {
        navigate("/ngopage");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="loginpage">
      <div className="logincontainer">
        <h1 className="loginheading">
          {isLogin ? "Unlock Your Potential" : "Join the Movement"}
        </h1>
        <p className="loginsubheading">
          {isLogin
            ? "Login to access exclusive resources and community"
            : "Sign up to become a part of our women in tech community"}
        </p>
        <form onSubmit={handleSubmit} className="loginform">
          {isLogin ? (
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setname(event.target.value)}
                placeholder="Your username"
              />
              <br />

              <label>Role:</label>
              <select value={role} onChange={handleRoleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="mentor">Mentor</option>
              </select>
              <br />

              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
            </div>
          ) : (
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setname(event.target.value)}
                placeholder="Your full name"
              />
              <br />
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
              <br />
              <label>College Name:</label>
              <input
                type="text"
                value={collegename}
                onChange={(event) => setcollegename(event.target.value)}
                placeholder="Your college name"
              />
              <br />
              <label>Registration Number:</label>
              <input
                type="number"
                value={registrationid}
                onChange={(event) => setregistrationid(event.target.value)}
                placeholder="Your registration number"
              />
            </div>
          )}
          <button type="submit" className="loginbutton">
            {isLogin ? "Login" : "Signup"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="loginfooter">
          {isLogin ? (
            <span>
              Don't have an account?{" "}
              <a onClick={toggleForm} className="loginlink">
                Signup
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <a onClick={toggleForm} className="loginlink">
                Login
              </a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
