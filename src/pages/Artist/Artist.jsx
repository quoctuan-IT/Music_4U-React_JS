import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import api from "../../services/api";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

function Artist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const start = Date.now();

      try {
        const response = await api.get("/artists/");

        setArtists(response.data);
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

    fetchArtists();
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
            <i className="bi bi-people-fill"></i> Discover Artists
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

        {artists.length > 0 ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
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

export default Artist;
