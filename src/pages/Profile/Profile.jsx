import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// CSS
import "./Profile.css";

// Components
import Loading from "../../components/Alert/Loading";

function Profile() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Profile Header Card */}
          <div className="card bg-dark border-0 shadow-lg rounded-2 overflow-hidden mb-4 shadow-pink-glow">
            <div
              className="card-header border-0 py-2 text-center"
              style={{
                background: "linear-gradient(45deg, #ff2d55, #000)",
              }}
            >
              <div className="position-relative d-inline-block mb-3">
                <i className="bi bi-person-circle display-4 text-white"></i>

                <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-light rounded-circle shadow-sm">
                  <span className="visually-hidden">Online</span>
                </span>
              </div>

              <h3 className="fw-bold text-white mb-0">{user.username}</h3>
            </div>

            <div className="card-body p-4 bg-black text-white">
              <div className="row text-center g-1">
                <div className="col-md-12">
                  <small className="text-secondary d-block text-uppercase mb-1 fw-bold ls-1">
                    Email Address
                  </small>

                  <div className="fw-semibold fs-6">
                    {user.email || "No Email"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-white mb-4 fw-bold px-2">Dashboard</h4>

          {/* Favorites */}
          <div className="row g-3">
            <div className="col-md-4">
              <Link
                to="/favorites"
                className="dashboard-card group text-decoration-none"
              >
                <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                  <div className="card-body p-4 text-center">
                    <div className="icon-box mb-3 bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <i className="bi bi-heart-fill text-danger fs-2"></i>
                    </div>

                    <h5 className="text-white fw-bold mb-1">Favorites</h5>

                    <p className="text-secondary small mb-0">
                      Your saved tracks
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Albums */}
            <div className="col-md-4">
              <Link
                to="/albums"
                className="dashboard-card group text-decoration-none"
              >
                <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                  <div className="card-body p-4 text-center">
                    <div className="icon-box mb-3 bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <i className="bi bi-collection-play-fill text-primary fs-2"></i>
                    </div>

                    <h5 className="text-white fw-bold mb-1">Albums</h5>

                    <p className="text-secondary small mb-0">
                      Manage your playlists
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Admin Panel */}
            <div className="col-md-4">
              <a
                href="https://phamquoctuan041203.pythonanywhere.com/admin"
                className="dashboard-card group text-decoration-none"
              >
                <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                  <div className="card-body p-4 text-center">
                    <div className="icon-box mb-3 bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <i className="bi bi-shield-lock-fill text-warning fs-2"></i>
                    </div>

                    <h5 className="text-white fw-bold mb-1">Admin</h5>

                    <p className="text-secondary small mb-0">System settings</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
