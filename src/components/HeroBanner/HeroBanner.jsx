import { Link } from "react-router-dom";

// CSS
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <div className="home-hero position-relative overflow-hidden">
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center py-4">
          <div className="col-lg-7 text-center text-lg-start">
            <span className="badge btn-pink mb-3 p-2 px-3 rounded-pill fw-bold">
              WELCOME TO PQT - M4U
            </span>

            <h1 className="display-3 fw-bold text-white mb-3">
              Music for <span className="text-pink">Homies</span>
            </h1>

            <p className="lead text-secondary mb-4">
              Music Streaming Platform Developed by{" "}
              <strong style={{ color: "pink" }}>Quốc Tuấn IT ❤️</strong>
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <Link
                to="/songs"
                className="btn btn-pink rounded-pill px-3 py-3 fw-bold shadow d-inline-flex align-items-center justify-content-center"
                style={{
                  height: "45px",
                  minWidth: "140px",
                }}
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                Songs
              </Link>

              <Link
                to="/artists"
                className="btn btn-outline-light rounded-pill px-3 py-3 fw-bold d-inline-flex align-items-center justify-content-center"
                style={{
                  height: "45px",
                  minWidth: "140px",
                }}
              >
                <i className="bi bi-person-fill text-pink me-2"></i>
                Artists
              </Link>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block text-end">
            <i
              className="bi bi-vinyl-fill text-pink opacity-25"
              style={{ fontSize: "15rem" }}
            ></i>
          </div>
        </div>
      </div>

      <div
        className="position-absolute top-0 end-0 translate-middle-y"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255, 45, 85, 0.15) 0%, transparent 70%)",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}

export default HeroBanner;
