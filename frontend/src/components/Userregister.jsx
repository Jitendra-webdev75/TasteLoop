import AuthLayout from "../pages/Authlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();
  // const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  // const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!form.fullName || !form.email || !form.password) {
    //   setError("Fill in every field to create your account.");
    //   return;
    // }

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post(
      "https://tasteloop.onrender.com/api/auth/user/register",
      {
        fullname: fullName,
        email: email,
        password: password,
      },
      { withCredentials: true },
    );

    console.log(response.data);
    // Store token in localStorage to indicate user is logged in
    localStorage.setItem("token", "user-logged-in");
    navigate("/");
  };

  return (
    <AuthLayout
      role="user"
      mode="register"
      eyebrow="Get started"
      title="Create your account"
      subtitle="Sign up to start ordering from restaurants near you."
      switchModeText="Already have an account?"
      switchModeLink="/user/login"
      switchModeLabel="Log in"
      roleSwitchText="Are you a food partner?"
      roleSwitchLink="/food-partner/register"
      roleSwitchLabel="Register here"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Your full name"
            // value={form.fullName}
            // onChange={handleChange}
          />
        </div>

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
            placeholder="Create a password"
            // value={form.password}
            // onChange={handleChange}
          />
        </div>

        {/* {error ? <p className="auth-error">{error}</p> : null} */}

        <button type="submit" className="auth-submit">
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}

export default UserRegister;
