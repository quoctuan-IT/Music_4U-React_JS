import { Link } from "react-router-dom";

// Resources
import reactLogo from "../../assets/react.svg";

function Login() {
  return (
    <form>
      <img
        src={reactLogo}
        alt="React logo"
        width={200}
        height={200}
        className="mb-4"
      />

      <h1 className="h3 mb-3">LOGIN</h1>

      <div className="form-floating mb-3">
        <input
          autoFocus
          type="text"
          className="form-control"
          name="username"
          required
        />
        <label className="form-label">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
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

      <button className="btn btn-info text-black fw-bold w-100 py-2 ">
        LOGIN
      </button>
    </form>
  );
}

export default Login;
