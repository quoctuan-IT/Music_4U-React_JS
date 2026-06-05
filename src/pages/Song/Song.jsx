import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import api from "../../services/api";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";
import SongCard from "../../components/SongCard/SongCard";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

function Song() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const start = Date.now();

      try {
        const response = await api.get("/songs/");

        setSongs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <SearchCard />

      <div className="container pb-4 mt-4">
        <div className="mb-5">
          <h2 className="display-6 fw-bold text-center text-pink text-uppercase tracking-wider">
            <i className="bi bi-vinyl-fill"></i> Songs Collection
          </h2>

          <div
            className="mx-auto"
            style={{
              width: "60px",
              height: "3px",
              background: "var(--bs-primary)",
            }}
          ></div>
        </div>

        {songs.length > 0 ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <EmptyData />
        )}
      </div>
    </>
  );
}

export default Song;
