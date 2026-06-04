import { Link, NavLink } from "react-router-dom";

// CSS
import "./Header.css";

// Resources
import reactLogo from "../../assets/react.svg";

function Header() {
  const isAuthenticated = true;

  const user = {
    username: "Pham Quoc Tuan",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-glass">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="logo-wrapper d-flex align-items-center justify-content-center rounded-circle me-2">
            <img
              src={reactLogo}
              alt="Logo"
              width="36"
              height="36"
              className="rounded-circle"
            />
          </div>

          <span className="fw-bold fs-3 text-uppercase brand-text text-pink">
            PQT 🤍 M4U
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3 text-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded active-link"
                    : "nav-link px-3 py-2 rounded"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/artists"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded active-link"
                    : "nav-link px-3 py-2 rounded"
                }
              >
                Artists
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/songs"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded active-link"
                    : "nav-link px-3 py-2 rounded"
                }
              >
                Songs
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-center gap-3 py-3 py-lg-0">
            {isAuthenticated ? (
              <div className="dropdown w-100 text-center">
                <button
                  className="btn btn-outline-pink btn-sm rounded-pill dropdown-toggle px-3"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.username}
                </button>

                <ul className="dropdown-menu dropdown-menu-end custom-dropdown bg-dark border-secondary shadow-lg">
                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item text-white py-2"
                    >
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider bg-secondary opacity-25" />
                  </li>

                  <li>
                    <Link
                      to="/logout"
                      className="dropdown-item text-danger py-2"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-pink px-3 shadow-sm fw-bold"
              >
                <i className="bi bi-person me-2"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
