import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS
import "./Home.css";

// Services
import api from "../../services/api";

// Components
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SearchCard from "../../components/SearchCard/SearchCard";
import SongCard from "../../components/SongCard/SongCard";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      const start = Date.now();

      try {
        const response = await api.get("/");

        setSongs(response.data.songs);
        setArtists(response.data.artists);
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

    fetchHome();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <HeroBanner />

      <SearchCard />

      {artists.length > 0 || songs.length > 0 ? (
        <div className="container">
          {/* Newest Songs Section */}
          <section className="mb-5 mt-2">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="fw-bold text-white mb-0">
                  <i className="bi bi-stars text-pink me-2"></i>Newest Releases
                </h2>

                <div className="header-line mt-2"></div>
              </div>

              <Link
                to="/songs"
                className="text-pink text-decoration-none small fw-bold"
              >
                View All <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {songs.map((song) => (
                <div key={song.id} className="col card-hover-effect">
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          </section>

          {/* Newest Artists Section */}
          <section className="py-5">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="fw-bold text-white mb-0">
                  <i className="bi bi-person-fill text-pink me-2"></i>Newest
                  Artists
                </h2>

                <div className="header-line mt-2"></div>
              </div>

              <Link
                to="/artists"
                className="text-pink text-decoration-none small fw-bold"
              >
                View All <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-4">
              {artists.map((artist) => (
                <div key={artist.id} className="col card-hover-effect">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Empty State */
        <EmptyData />
      )}
    </>
  );
}

export default Home;
