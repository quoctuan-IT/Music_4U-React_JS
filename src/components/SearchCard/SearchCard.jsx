import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// CSS
import "./SearchCard.css";

// Services
import api from "../../services/api";

function SearchCard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "",
  );
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
    setSelectedGenre(searchParams.get("genre") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/genres/");
        setGenres(response.data.results ?? response.data ?? []);
      } catch {
        setGenres([]);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) params.set("query", trimmedQuery);
    if (selectedGenre) params.set("genre", selectedGenre);

    const search = params.toString();
    navigate(search ? `/search?${search}` : "/search");
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="p-4 rounded-4 shadow bg-black">
        <form
          className="row g-3 align-items-end justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="col-lg-5 col-md-5 col-12">
            <label
              className="form-label fw-bold text-pink"
              htmlFor="searchInput"
            >
              <i className="bi bi-search-heart"></i> Search
            </label>

            <input
              id="searchInput"
              type="text"
              name="query"
              placeholder="Enter Song title or Artist"
              className="form-control rounded-pill bg-dark text-white border-secondary shadow-none custom-focus"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-12">
            <label
              className="form-label fw-bold text-pink"
              htmlFor="genreSelect"
            >
              <i className="bi bi-funnel"></i> Genre
            </label>

            <select
              id="genreSelect"
              name="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="form-select rounded-pill bg-dark text-white border-secondary shadow-none custom-focus"
            >
              <option value="">All Genres</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2 col-md-3 col-6 d-grid">
            <button type="submit" className="btn btn-pink rounded-pill fw-bold">
              Search
            </button>
          </div>
        </form>

        {(query || selectedGenre) && (
          <div className="text-center mt-3">
            <Link
              to="/search"
              className="btn btn-sm btn-outline-info rounded-pill py-2 px-4 transition-base"
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCard;
