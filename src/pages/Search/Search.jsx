import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// CSS
import "./Search.css";

// Services
import api from "../../services/api";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";
import SongCard from "../../components/SongCard/SongCard";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const selectedGenre = searchParams.get("genre") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchSearch = async () => {
      const start = Date.now();

      try {
        const params = {};
        if (query) params.query = query;
        if (selectedGenre) params.genre = selectedGenre;

        const response = await api.get("/search/", { params });

        setSongs(response.data.songs ?? []);
        setArtists(response.data.artists ?? []);
        setSelectedGenreName(response.data.selected_genre_name ?? "");
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

    fetchSearch();
  }, [query, selectedGenre]);

  const renderHeaderTitle = () => {
    if (query && selectedGenreName) {
      return (
        <>
          <span className="opacity-50">Results for</span> &apos;{query}&apos; -
          &apos;
          {selectedGenreName}&apos;
        </>
      );
    }

    if (selectedGenreName) {
      return (
        <>
          <span className="opacity-50">Genre:</span> &apos;{selectedGenreName}
          &apos;
        </>
      );
    }

    if (query) {
      return (
        <>
          <span className="opacity-50">Results for</span> &apos;{query}&apos;
        </>
      );
    }

    return <>Explore Music</>;
  };

  if (loading) {
    return (
      <>
        <SearchCard />
        
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchCard />

        <ErrorMessage message={error} />
      </>
    );
  }

  const hasResults = songs.length > 0 || artists.length > 0;

  return (
    <>
      <SearchCard />

      <div className="container mt-5">
        <div className="mb-5">
          <h6 className="text-pink text-uppercase fw-bold ls-1 mb-2">
            Search Results
          </h6>

          <h5 className="fw-bold text-white">{renderHeaderTitle()}</h5>
        </div>

        {hasResults ? (
          <>
            {songs.length > 0 && (
              <section className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <h4 className="text-white fw-bold mb-0 me-3">Songs</h4>

                  <div className="flex-grow-1 border-bottom border-secondary border-opacity-25"></div>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                  {songs.map((song) => (
                    <SongCard key={song.id} song={song} />
                  ))}
                </div>
              </section>
            )}

            {artists.length > 0 && (
              <section className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <h4 className="text-white fw-bold mb-0 me-3">Artists</h4>

                  <div className="flex-grow-1 border-bottom border-secondary border-opacity-25"></div>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                  {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <EmptyData />
        )}
      </div>
    </>
  );
}

export default Search;
