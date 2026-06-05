import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

// CSS
import "./SongDetail.css";

// Services
import api from "../../services/api";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";

function SongDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const isAuthenticated = true;
  const isFavorite = true;

  // Music
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Music
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const fetchSong = async () => {
      const start = Date.now();

      try {
        const response = await api.get(`/songs/${id}/`);

        setSong(response.data);
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

    fetchSong();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Music
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handlePlay = () => setIsPlaying(true);

  const handlePause = () => setIsPlaying(false);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const value = e.target.value;

    audio.currentTime = (value / 100) * duration;
  };

  return (
    <>
      <SearchCard />

      <div className="container py-2">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card bg-transparent border-0 overflow-hidden shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,0,155,0.2) 0%, rgba(0,0,0,1) 100%)",
              }}
            >
              <div className="row g-0 align-items-center p-4">
                {/* Cover */}
                <div className="col-md-4 mb-4 mb-md-0 text-center">
                  <div className="player-disc-wrapper d-inline-block position-relative">
                    <div className="disc-hole"></div>

                    <img
                      src={song.cover_image}
                      alt={song.title}
                      className={`img-fluid rounded-circle shadow-lg border border-5 border-white rotate-anim ${
                        isPlaying ? "playing" : "paused"
                      }`}
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        width: "100%",
                        maxWidth: "260px",
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="col-md-8 ps-md-5">
                  <h1 className="display-5 fw-bold text-white mb-2">
                    {song.title}
                  </h1>

                  <h4 className="mb-4">
                    <Link
                      to={`/artists/${song.artist.id}`}
                      className="text-pink text-decoration-none hover-white"
                    >
                      {song.artist.name}
                    </Link>
                  </h4>

                  {/* Genres */}
                  <div className="mb-4">
                    {song.genres.length > 0 &&
                      song.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="badge rounded-pill border border-secondary text-secondary me-2 p-2 px-3"
                        >
                          # {genre.name}
                        </span>
                      ))}
                  </div>

                  {/* Audio */}
                  <div className="audio-player-detail p-3 rounded-4 border border-dark-subtle shadow-pink-glow mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <button
                        onClick={handlePlayPause}
                        className="btn btn-pink rounded-circle d-flex align-items-center justify-content-center shadowplay flex-shrink-0"
                        style={{
                          width: "35px",
                          height: "35px",
                          transition: "transform 0.2s",
                        }}
                      >
                        <i
                          className={
                            isPlaying
                              ? "bi bi-pause-fill fs-4"
                              : "bi bi-play-fill fs-4"
                          }
                        />
                      </button>

                      <div className="flex-grow-1">
                        <input
                          type="range"
                          className="form-range custom-range"
                          min="0"
                          max="100"
                          value={duration ? (currentTime / duration) * 100 : 0}
                          onChange={handleSeek}
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <span>{formatTime(currentTime)}</span>

                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>

                    <audio
                      ref={audioRef}
                      src={song.audio_file}
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      autoPlay
                    />
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    {isAuthenticated && (
                      <button
                        className="btn btn-favorite border border-secondary rounded-circle d-flex align-items-center justify-content-center"
                        data-song-id={song.id}
                        style={{ width: "40px", height: "40px" }}
                      >
                        {isFavorite ? (
                          <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                          <i className="bi bi-heart text-pink"></i>
                        )}
                      </button>
                    )}

                    <div className="text-secondary small">
                      <i className="bi bi-cloud-arrow-up me-1"></i> #{" "}
                      {song.uploaded_by_name}
                      <span className="mx-2">|</span>
                      <i className="bi bi-calendar-event me-1"></i>{" "}
                      {new Date(song.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                {isAuthenticated && (
                  <div className="p-4 rounded-1 bg-dark border border-secondary border-opacity-25 shadow-sm mb-4">
                    <h5 className="text-pink fw-bold mb-3">
                      <i className="bi bi-plus-square-dotted text-pink me-2"></i>
                      Save to Album
                    </h5>

                    <form>
                      <div className="input-group">
                        <select
                          defaultValue=""
                          className="form-select bg-black text-white border-secondary custom-focus rounded-start-pill"
                          required
                        >
                          <option value="" disabled>
                            Choose an album
                          </option>

                          <option disabled>No albums found</option>
                        </select>

                        <button className="btn btn-pink rounded-end-pill px-4">
                          <i className="bi bi-plus-square-dotted"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="col-md-8">
                <div className="p-4 rounded-1 bg-dark border border-secondary border-opacity-25 h-100 shadow-sm">
                  <h5 className="text-pink fw-bold border-bottom border-secondary border-opacity-25 pb-2">
                    <i className="bi bi-card-text me-2"></i>Lyrics
                  </h5>

                  <div
                    className="lyrics-container text-secondary lh-lg"
                    style={{
                      whiteSpace: "pre-line",
                      fontStyle: "italic",
                    }}
                  >
                    {song.lyrics || "Lyrics updating."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongDetail;
