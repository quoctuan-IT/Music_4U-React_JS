import { Link } from "react-router-dom";

// Resources
import reactLogo from "../../assets/react.svg";

function Register() {
  return (
    <form>
      <img
        src={reactLogo}
        alt="React logo"
        width={200}
        height={200}
        className="mb-4"
      />

      <h1 className="h3 mb-3">REGISTER</h1>

      <div className="form-floating mb-3">
        <input
          autoFocus
          type="text"
          className="form-control"
          name="username"
          required
        />
        <label className="form-label">Username</label>

        <div className="text-danger mt-1">Errors</div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          required
        />

        <label className="form-label">Password</label>

        <div className="text-danger mt-1">Errors</div>
      </div>

      <p className="mt-3 text-center">
        Already have account?{" "}
        <Link to="/login" className="text-info">
          Login
        </Link>
      </p>

      <button className="btn btn-info text-black fw-bold w-100 py-2 ">
        REGISTER
      </button>
    </form>
  );
}

export default Register;
