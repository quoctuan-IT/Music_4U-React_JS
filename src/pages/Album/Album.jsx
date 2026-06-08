import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./Album.css";

// Services
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

// Components
import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

// Resources
import reactLogo from "../../assets/react.svg";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getAlbumCover(album) {
  return album.songs?.[0]?.cover_image || reactLogo;
}

function Album() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useMessage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    const fetchAlbums = async () => {
      const start = Date.now();

      try {
        const response = await api.get("/albums/");
        setAlbums(response.data.results ?? []);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.response?.data?.detail ||
            err.message,
        );
      } finally {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    };

    fetchAlbums();
  }, [isAuthenticated]);

  const handleDelete = async (album) => {
    if (!window.confirm(`Delete "${album.name}"?`)) return;

    try {
      const response = await api.delete(`/albums/${album.id}/`);
      setAlbums((prev) => prev.filter((item) => item.id !== album.id));
      showSuccess(response.data?.message || `Album "${album.name}" deleted.`);
    } catch (err) {
      showError(
        err.response?.data?.error || err.response?.data?.detail || err.message,
      );
    }
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-white mb-1">
            <i className="bi bi-collection-play text-pink me-2"></i>Albums
          </h2>
          <p className="text-secondary mb-0">
            Curated by{" "}
            <span className="text-white fw-semibold">{user.username}</span>
          </p>
        </div>

        <Link
          to="/album/create"
          className="btn btn-pink rounded-pill px-4 fw-bold shadow d-inline-flex align-items-center justify-content-center"
          style={{ height: "45px" }}
        >
          <i className="bi bi-folder-plus me-2"></i>New Album
        </Link>
      </div>

      {albums.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {albums.map((album) => (
            <div key={album.id} className="col">
              <div className="card h-100 bg-dark border-0 rounded-4 overflow-hidden shadow-sm card-album-hover">
                <div className="position-relative album-artwork-wrapper">
                  <img
                    src={getAlbumCover(album)}
                    className="card-img-top"
                    alt={album.name}
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />

                  <div className="artwork-overlay d-flex align-items-center justify-content-center">
                    <Link
                      to={`/album/${album.id}`}
                      className="btn btn-pink rounded-circle p-3 shadow-lg"
                    >
                      <i className="bi bi-play-fill fs-2"></i>
                    </Link>
                  </div>
                </div>

                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5
                      className="card-title text-white fw-bold text-truncate mb-0"
                      style={{ maxWidth: "70%" }}
                    >
                      {album.name}
                    </h5>
                    <span className="badge bg-secondary bg-opacity-25 text-pink rounded-pill small">
                      {album.songs?.length ?? 0} Tracks
                    </span>
                  </div>
                  <p className="text-secondary small mb-3">
                    Created on {formatDate(album.created_at)}
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <Link
                      to={`/album/${album.id}`}
                      className="btn btn-sm btn-outline-light rounded-pill px-3 flex-grow-1 fw-bold"
                    >
                      Detail
                    </Link>

                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => handleDelete(album)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
}

export default Album;
