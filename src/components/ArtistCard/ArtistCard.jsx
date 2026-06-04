import { Link } from "react-router-dom";

// CSS
import "./ArtistCard.css";

// Resources
import reactLogo from "../../assets/react.svg";

function ArtistCard({ artist }) {
  return (
    <div className="col">
      <div className="card h-100 bg-transparent border-0 artist-card group text-center">
        <Link to={`/artists/${artist.id}`} className="text-decoration-none">
          <div
            className="position-relative mx-auto mb-3 overflow-hidden rounded-circle shadow-lg artist-img-wrapper"
            style={{
              width: "180px",
              height: "180px",
              border: "2px solid transparent",
              transition: "border-color 0.3s ease",
            }}
          >
            <img
              src={artist.image || reactLogo}
              alt={artist.name}
              className="img-fluid h-100 w-100 artist-img"
              style={{ objectFit: "cover" }}
            />

            <div className="artist-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <i className="bi bi-search text-white fs-4"></i>
            </div>
          </div>

          <div className="card-body p-0">
            <h5 className="card-title text-white fw-bold mb-1 hover-pink transition-base">
              {artist.name}
            </h5>
            <p className="text-secondary small text-uppercase tracking-tighter">
              <i className="bi bi-music-note-beamed me-1"></i> 99 Songs
            </p>
          </div>
        </Link>

        <div className="card-footer bg-transparent border-0 p-0 mt-2">
          <Link
            to={`/artists/${artist.id}`}
            className="btn btn-sm btn-outline-pink rounded-pill px-4 fw-bold"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
