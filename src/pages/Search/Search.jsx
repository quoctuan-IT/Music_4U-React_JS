import { Link } from "react-router-dom";

// CSS
import "./Search.css";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";
import SongCard from "../../components/SongCard/SongCard";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

function Search() {
  var query = "query";

  var selectedGenre = "selectedGenre";

  const genres = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Rap" },
  ];

  return (
    <>
      <SearchCard />

      <div className="container mt-5">
        {/* Search Header */}
        <div className="mb-5">
          <h6 className="text-pink text-uppercase fw-bold ls-1 mb-2">
            Search Results
          </h6>

          <h5 className="fw-bold text-white">
            <span className="opacity-50">Results for</span> '{query}' - '
            {selectedGenre}'
            <hr />
            <span className="opacity-50">Genre:</span> '{selectedGenre}'
            <hr />
            <span className="opacity-50">Results for</span> '{query}'
            <hr />
            Explore Music
          </h5>
        </div>

        {/* Songs Section */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <h4 className="text-white fw-bold mb-0 me-3">Songs</h4>

            <div className="flex-grow-1 border-bottom border-secondary border-opacity-25"></div>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            <div className="col">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </section>

        {/* <!-- Artists Section */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <h4 className="text-white fw-bold mb-0 me-3">Artists</h4>

            <div className="flex-grow-1 border-bottom border-secondary border-opacity-25"></div>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            <div className="col">
              <ArtistCard />
            </div>
            <div className="col">
              <ArtistCard />
            </div>
            <div className="col">
              <ArtistCard />
            </div>
            <div className="col">
              <ArtistCard />
            </div>
            <div className="col">
              <ArtistCard />
            </div>
          </div>
        </section>

        {/* No Results */}
        <div className="text-center py-5 rounded-0 mt-4">
          <div className="mb-4">
            <div className="search-empty-icon mx-auto mb-3">
              <i className="bi bi-search-heart text-secondary opacity-25"></i>
            </div>

            <h3 className="text-white fw-bold">No results found!</h3>

            <p
              className="text-secondary mb-4 mx-auto"
              style={{ maxWidth: "400px" }}
            >
              We couldn't find any songs or artists matching your search.
            </p>

            <Link
              to="/"
              className="btn btn-pink rounded-pill px-5 py-2 fw-bold shadow-sm"
            >
              <i className="bi bi-house-door me-2"></i>
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
