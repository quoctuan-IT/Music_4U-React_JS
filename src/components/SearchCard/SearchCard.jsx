import { Link } from "react-router-dom";

// CSS
import "./SearchCard.css";

function SearchCard() {
  var query;

  var selectedGenre;

  const genres = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Rap" },
  ];

  return (
    <div className="container mt-4 mb-4">
      <div className="p-4 rounded-4 shadow bg-black">
        <form className="row g-3 align-items-end justify-content-center">
          <div className="col-lg-5 col-md-5 col-12">
            <label className="form-label fw-bold text-pink">
              <i className="bi bi-search-heart"></i> Search
            </label>

            <input
              type="text"
              name="query"
              placeholder="Enter Song title or Artist"
              className="form-control rounded-pill bg-dark text-white border-secondary shadow-none custom-focus"
              value={query}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-12">
            <label className="form-label fw-bold text-pink">
              <i className="bi bi-funnel"></i> Genre
            </label>

            <select
              id="genreSelect"
              name="genre"
              value={selectedGenre}
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
            <Link
              to={{
                pathname: "/search",
                // search: "?query=string",
                // hash: "#hash",
              }}
              className="btn btn-pink rounded-pill fw-bold"
            >
              Search
            </Link>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link
            to="/"
            className="btn btn-sm btn-outline-info rounded-pill py-2 px-4 transition-base"
          >
            <i className="bi bi-x-circle me-1"></i>
            Clear Filters
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
