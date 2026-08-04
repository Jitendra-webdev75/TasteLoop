import { useState } from "react";
import AuthLayout from "../pages/Authlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FoodPartnerRegister() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "https://tasteloop.onrender.com/api/auth/manager/register",
        {
          fullname: form.fullName,
          address: form.address,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true },
      );

      navigate("/food");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create the partner account.",
      );
    }
  };

  return (
    <AuthLayout
      role="food-partner"
      mode="register"
      eyebrow="Partner sign up"
      title="List your kitchen"
      subtitle="Create a partner account to start receiving orders."
      switchModeText="Already a partner?"
      switchModeLink="/food-partner/login"
      switchModeLabel="Log in"
      roleSwitchText="Looking to order food?"
      roleSwitchLink="/user/register"
      roleSwitchLabel="Register here"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Owner or manager name"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="address">Business address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Street, city, state"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error ? <p className="auth-error">{error}</p> : null}

        <button type="submit" className="auth-submit">
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}

export default FoodPartnerRegister;
