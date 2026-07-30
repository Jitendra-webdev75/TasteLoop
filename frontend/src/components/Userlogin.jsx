// import { useState } from "react";
import AuthLayout from "../pages/Authlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserLogin() {
  const navigate = useNavigate();
  // const [form, setForm] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");

    // if (!form.email || !form.password) {
    //   setError("Enter your email and password to continue.");
    //   return;
    // }
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
    );

    console.log(response.data);
    navigate("/");
  };

  return (
    <AuthLayout
      role="user"
      mode="login"
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Enter your details to order from your favorite places."
      switchModeText="New here?"
      switchModeLink="/user/register"
      switchModeLabel="Create an account"
      roleSwitchText="Are you a food partner?"
      roleSwitchLink="/food-partner/login"
      roleSwitchLabel="Log in here"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            // value={form.email}
            // onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            // value={form.password}
            // onChange={handleChange}
          />
        </div>
        {/* 
        {error ? <p className="auth-error">{error}</p> : null} */}

        <button type="submit" className="auth-submit">
          Log in
        </button>
      </form>
    </AuthLayout>
  );
}

export default UserLogin;
