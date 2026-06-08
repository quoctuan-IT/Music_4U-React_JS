import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

// CSS
import "./AlbumDetail.css";

// Services
import api from "../../services/api";

// Components
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import SongList from "../../components/SongList/SongList";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import EmptyData from "../../components/Alert/EmptyData";

// Resources
import reactLogo from "../../assets/react.svg";

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useMessage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Music player
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasTrack, setHasTrack] = useState(false);

  const songs = album?.songs ?? [];

  const playlist = useMemo(() => {
    if (!songs.length) return [];

    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist?.name,
      url: song.audio_file,
      cover: song.cover_image || reactLogo,
    }));
  }, [songs]);

  const currentTrack = hasTrack ? playlist[currentIndex] : null;

  const playSong = useCallback(
    (index) => {
      if (index < 0 || index >= playlist.length) return;

      setCurrentIndex(index);
      setHasTrack(true);

      const song = playlist[index];
      const audio = audioRef.current;
      if (!audio) return;

      audio.src = song.url;
      audio.play();
    },
    [playlist],
  );

  const playAllSongs = useCallback(() => {
    if (playlist.length > 0) playSong(0);
  }, [playlist.length, playSong]);

  const playNextSong = useCallback(() => {
    if (playlist.length === 0) return;

    if (currentIndex < playlist.length - 1) {
      playSong(currentIndex + 1);
    } else {
      playSong(0);
    }
  }, [currentIndex, playlist.length, playSong]);

  const playPreviousSong = useCallback(() => {
    if (playlist.length === 0) return;

    if (currentIndex > 0) {
      playSong(currentIndex - 1);
    } else {
      playSong(playlist.length - 1);
    }
  }, [currentIndex, playlist.length, playSong]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.src) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      playAllSongs();
    }
  }, [playAllSongs]);

  useEffect(() => {
    if (!isAuthenticated) return;

    setHasTrack(false);
    setCurrentIndex(0);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    setLoading(true);
    setError(null);

    const fetchAlbum = async () => {
      const start = Date.now();

      try {
        const response = await api.get(`/albums/${id}/`);
        setAlbum(response.data);
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

    fetchAlbum();
  }, [id, isAuthenticated]);

  const handleRemoveSong = async (songId) => {
    if (!window.confirm("Are you sure to remove this song?")) return;

    try {
      const response = await api.delete(
        `/albums/${id}/songs/${songId}/remove/`,
      );
      setAlbum((prev) => ({
        ...prev,
        songs: prev.songs.filter((song) => song.id !== songId),
      }));
      showSuccess(response.data?.message || "Song removed from album.");

      if (hasTrack && playlist[currentIndex]?.id === songId) {
        setHasTrack(false);
        setCurrentIndex(0);

        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
        }
      }
    } catch (err) {
      showError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.response?.data?.detail ||
          err.message,
      );
    }
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!user || !album) {
    return null;
  }

  const coverImage = songs[0]?.cover_image || reactLogo;

  return (
    <>
      <div
        className="album-header position-relative mt-5 rounded-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 0, 155, 0.2) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-end">
            <div className="col-md-4 col-lg-3 text-center mb-4 mb-md-0">
              <div className="position-relative d-inline-block shadow-lg rounded-4 overflow-hidden shadow-pink-glow">
                <img
                  src={coverImage}
                  alt={album.name}
                  className="img-fluid album-main-img"
                  style={{
                    width: "280px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div className="col-md-8 col-lg-9 ps-md-5">
              <span className="badge btn-pink mb-2 text-uppercase fw-bold p-2 px-3 rounded-pill">
                Personal Album
              </span>
              <h1 className="display-5 fw-bold text-white mb-2">
                {album.name}
              </h1>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center text-white">
                  <i className="bi bi-person-circle fs-5 me-2 text-pink"></i>
                  <span className="fw-semibold">{user.username}</span>
                </div>
                <span className="text-secondary">|</span>
                <span className="text-secondary fw-bold">
                  {songs.length} Tracks
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                {songs.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-pink rounded-pill px-4 fw-bold shadow d-inline-flex align-items-center justify-content-center"
                    onClick={playAllSongs}
                    style={{ height: "45px", minWidth: "140px" }}
                  >
                    <i className="bi bi-play-fill fs-4 me-1"></i> Play All
                  </button>
                )}

                <Link
                  to="/"
                  className="btn btn-outline-light rounded-pill px-4 fw-bold d-inline-flex align-items-center justify-content-center"
                  style={{ height: "45px", minWidth: "140px" }}
                >
                  <i className="bi bi-plus-lg me-2"></i> More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {songs.length > 0 ? (
          <div className="row g-4">
            <div className="col-lg-8">
              <h4 className="text-white mb-4 fw-bold">
                <i className="bi bi-music-note-list text-pink me-2"></i>
                Tracklist
              </h4>
              <div className="song-list-container rounded-4 overflow-hidden border border-secondary border-opacity-25 shadow-sm">
                {songs.map((song, index) => (
                  <SongList
                    key={song.id}
                    song={song}
                    index={index}
                    isActive={hasTrack && currentIndex === index}
                    onPlay={playSong}
                    onRemove={() => handleRemoveSong(song.id)}
                  />
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: "100px" }}>
                <MusicPlayer
                  audioRef={audioRef}
                  track={currentTrack}
                  onTogglePlay={togglePlay}
                  onPrevious={playPreviousSong}
                  onNext={playNextSong}
                  onEnded={playNextSong}
                />
              </div>
            </div>
          </div>
        ) : (
          <EmptyData />
        )}
      </div>
    </>
  );
}

export default AlbumDetail;
