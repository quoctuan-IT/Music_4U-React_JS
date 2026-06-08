import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

// Resources
import reactLogo from "../../assets/react.svg";

function getErrorMessage(err) {
  const data = err.response?.data;
  if (!data) return err.message || "Login failed. Please try again.";

  if (typeof data === "string") return data;
  if (data.error) return data.error;
  if (data.detail) return data.detail;
  if (data.non_field_errors?.[0]) return data.non_field_errors[0];

  const firstKey = Object.keys(data)[0];
  const firstValue = data[firstKey];
  if (Array.isArray(firstValue)) return firstValue[0];
  if (typeof firstValue === "string") return firstValue;

  return "Login failed. Please try again.";
}

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        src={reactLogo}
        alt="React logo"
        width={200}
        height={200}
        className="mb-4"
      />

      <h1 className="h3 mb-3">LOGIN</h1>

      {error && (
        <div
          className="alert alert-danger py-2"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {error}
        </div>
      )}

      <div className="form-floating mb-3">
        <input
          autoFocus
          type="text"
          className="form-control"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="form-label">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label">Password</label>
      </div>

      <p className="mt-3 text-center">
        Don't have account?{" "}
        <Link to="/register" className="text-info">
          Register
        </Link>
      </p>

      <button
        type="submit"
        className="btn btn-info text-black fw-bold w-100 py-2 "
        disabled={submitting}
      >
        {submitting ? (
          <i className="bi bi-hourglass-bottom display-6"></i>
        ) : (
          "LOGIN"
        )}
      </button>
    </form>
  );
}

export default Login;
