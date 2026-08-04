import AuthLayout from "../pages/Authlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function FoodPartnerLogin() {
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
      "https://tasteloop.onrender.com/api/auth/manager/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
    );

    console.log(response.data);
    navigate("/food");
  };

  return (
    <AuthLayout
      role="food-partner"
      mode="login"
      eyebrow="Partner login"
      title="Log in to your kitchen"
      subtitle="Manage your menu and orders from your dashboard."
      switchModeText="New partner?"
      switchModeLink="/food-partner/register"
      switchModeLabel="Create an account"
      roleSwitchText="Looking to order food?"
      roleSwitchLink="/user/login"
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

        {/* {error ? <p className="auth-error">{error}</p> : null} */}

        <button type="submit" className="auth-submit">
          Log in
        </button>
      </form>
    </AuthLayout>
  );
}

export default FoodPartnerLogin;
