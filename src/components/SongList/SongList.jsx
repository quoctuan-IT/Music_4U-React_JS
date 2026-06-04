import { Link } from "react-router-dom";

function SongList({ song, index, albumId, onPlaySong }) {

    return (

        <div
            className="list-group-item song-item bg-dark border-0 border-bottom border-secondary border-opacity-10 py-2 py-md-3 px-3 px-md-4 transition-base"
            data-index={index}
            onClick={() => onPlaySong(index)}
        >

            <div className="row align-items-center g-2 g-md-3">

                <div
                    className="col-auto d-none d-md-block text-center"
                    style={{ width: "35px" }}
                >

                    <span className="text-secondary small fw-bold song-index">
                        {index + 1}
                    </span>

                    <i className="bi bi-play-fill text-pink d-none play-icon"></i>

                </div>

                <div className="col-auto">

                    <div className="position-relative artwork-container">

                        <img
                            src={song.coverImage}
                            alt={song.title}
                            className="rounded shadow-sm"
                            style={{
                                width: "48px",
                                height: "48px",
                                objectFit: "cover",
                            }}
                        />

                        <div className="artwork-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded">

                            <i className="bi bi-play-fill text-white fs-4"></i>

                        </div>

                    </div>

                </div>

                <div className="col overflow-hidden">

                    <div className="text-white fw-bold text-truncate mb-0 song-title">
                        {song.title}
                    </div>

                    <div className="text-secondary small text-truncate">
                        {song.artist.name}
                    </div>

                </div>

                <div className="col-auto">

                    <div className="d-flex align-items-center gap-2 gap-md-4">

                        <button
                            className="btn btn-link text-secondary p-1 btn-favorite shadow-none"
                            data-song-id={song.id}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >

                            <i
                                className={
                                    song.isFavorite
                                        ? "bi bi-heart-fill text-danger"
                                        : "bi bi-heart text-pink"
                                }
                            ></i>

                        </button>

                        <Link
                            to={`/songs/${song.id}`}
                            className="btn btn-link text-info p-1 d-md-inline-block shadow-none"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <i className="bi bi-info-circle hover-white scale-up"></i>

                        </Link>

                        <Link
                            to={`/albums/${albumId}/remove/${song.id}`}
                            className="btn btn-link text-danger p-1 shadow-none"
                            onClick={(e) => {
                                e.stopPropagation();

                                if (
                                    !window.confirm(
                                        "Are you sure to remove this song?"
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        >

                            <i className="bi bi-trash scale-up"></i>

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default SongList;