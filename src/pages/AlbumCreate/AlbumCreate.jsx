import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

// CSS
import "./AlbumCreate.css";

// Services
import api from "../../services/api";

// Components
import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";

function AlbumCreate() {
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useMessage();

  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post("/albums/", { name });
      showSuccess(`Album "${response.data.name}" created successfully!`);
      navigate(`/album/${response.data.id}`);
    } catch (err) {
      setError(
        err.response?.data?.error || err.response?.data?.detail || err.message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold text-white">
              <i className="bi bi-folder-plus text-pink me-2"></i>Create New
              Album
            </h2>
            <p className="text-secondary">
              Organize your favorite tracks into a personal collection
            </p>
          </div>

          <div className="card bg-dark border-0 shadow-lg rounded-4 overflow-hidden shadow-pink-glow">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-4">
                  <label
                    htmlFor="albumName"
                    className="form-label text-white fw-bold"
                  >
                    <i className="bi bi-pencil-square me-1"></i> Album Name
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-black border-secondary text-pink">
                      <i className="bi bi-collection"></i>
                    </span>
                    <input
                      id="albumName"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-3 mt-2">
                  <button
                    type="submit"
                    className="btn btn-pink rounded-pill py-2 fw-bold shadow d-flex align-items-center justify-content-center"
                    disabled={submitting}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {submitting ? "Creating..." : "Confirm"}
                  </button>

                  <Link
                    to="/album"
                    className="btn btn-outline-light rounded-pill py-2 fw-bold"
                  >
                    <i className="bi bi-arrow-left me-2"></i> Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCreate;
