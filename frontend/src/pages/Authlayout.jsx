import { Link } from "react-router-dom";
import "./Auth.css";

/**
 * Shared shell for all four auth screens.
 *
 * props:
 * - role: "user" | "food-partner"
 * - mode: "login" | "register"
 * - eyebrow, title, subtitle: copy for the header
 * - switchModeText, switchModeLink: e.g. "New here?" -> /user/register
 * - roleSwitchText, roleSwitchLink: e.g. "Are you a food partner?" -> /food-partner/login
 * - children: the <form> content
 */
function AuthLayout({
  role,
  mode,
  eyebrow,
  title,
  subtitle,
  switchModeText,
  switchModeLink,
  switchModeLabel,
  roleSwitchText,
  roleSwitchLink,
  roleSwitchLabel,
  children,
}) {
  const userBase = mode === "login" ? "/user/login" : "/user/register";
  const partnerBase =
    mode === "login" ? "/food-partner/login" : "/food-partner/register";

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-tabs">
          <Link
            to={userBase}
            className={`auth-tab ${role === "user" ? "active" : ""}`}
          >
            User
          </Link>
          <Link
            to={partnerBase}
            className={`auth-tab ${role === "food-partner" ? "active" : ""}`}
          >
            Food Partner
          </Link>
        </div>

        {eyebrow ? <p className="auth-eyebrow">{eyebrow}</p> : null}
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>

        {children}

        {switchModeLink ? (
          <p className="auth-switch">
            {switchModeText} <Link to={switchModeLink}>{switchModeLabel}</Link>
          </p>
        ) : null}

        {roleSwitchLink ? (
          <p className="auth-role-switch">
            {roleSwitchText} <Link to={roleSwitchLink}>{roleSwitchLabel}</Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default AuthLayout;
