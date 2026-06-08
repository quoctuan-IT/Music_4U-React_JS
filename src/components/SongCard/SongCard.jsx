import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// CSS
import "./SongCard.css";

// Resources
import reactLogo from "../../assets/react.svg";

// Components
import FavoriteButton from "../FavoriteButton/FavoriteButton";

function SongCard({ song, initialIsFavorite }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="col">
      <div className="card h-100 bg-transparent border-0 song-card">
        <div className="position-relative overflow-hidden rounded-4 shadow-lg group">
          <Link to={`/song/${song.id}`}>
            <img
              src={song.cover_image || reactLogo}
              alt={song.title}
              className="card-img-top song-img"
            />
          </Link>

          <div className="play-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <Link
              className="btn btn-pink rounded-circle shadow-lg btn-play-main"
              to={`/song/${song.id}`}
            >
              <i className="bi bi-play-fill fs-3"></i>
            </Link>
          </div>
        </div>

        <div className="card-body px-1 pt-3 pb-0">
          <h6
            className="card-title text-truncate fw-bold mb-1"
            title={song.title}
          >
            <Link
              to={`/song/${song.id}`}
              className="text-white text-decoration-none hover-pink"
            >
              {song.title}
            </Link>
          </h6>

          <p className="mb-2">
            <Link
              to={`/artist/${song.artist.id}`}
              className="text-secondary small text-decoration-none hover-pink"
            >
              <i className="bi bi-person me-1"></i>
              {song.artist.name}
            </Link>
          </p>
        </div>

        <div className="card-footer bg-transparent border-0 px-1 pt-0 pb-2 mt-auto">
          <div className="d-flex align-items-center justify-content-between">
            <Link
              to={`/song/${song.id}`}
              className="btn btn-sm btn-dark rounded-pill px-3 border-secondary"
            >
              <i className="bi bi-headphones me-1"></i>
              Play
            </Link>

            {isAuthenticated && (
              <FavoriteButton
                songId={song.id}
                song={song}
                initialIsFavorite={initialIsFavorite}
                className="btn btn-sm btn-favorite rounded-circle border-0"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
