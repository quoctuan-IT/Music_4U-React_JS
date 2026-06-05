import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

// CSS
import "./ArtistDetail.css";

// Services
import api from "../../services/api";

// Components
import SearchCard from "../../components/SearchCard/SearchCard";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import SongList from "../../components/SongList/SongList";

import Loading from "../../components/Alert/Loading";
import ErrorMessage from "../../components/Alert/ErrorMessage";

// Resources
import reactLogo from "../../assets/react.svg";

function ArtistDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState(null);
  const isAuthenticated = true;
  const isFavorite = true;

  // Music player
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasTrack, setHasTrack] = useState(false);

  const playlist = useMemo(() => {
    if (!songs?.length || !artist) return [];

    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist?.name ?? artist.name,
      url: song.audio_file,
      cover: song.cover_image || reactLogo,
    }));
  }, [songs, artist]);

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
    // Reset PlayerMusic
    setHasTrack(false);
    setCurrentIndex(0);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    // Reset page State
    setLoading(true);
    setError(null);

    const fetchArtist = async () => {
      const start = Date.now();

      try {
        const response = await api.get(`/artists/${id}/`);

        setArtist(response.data);
        setSongs(response.data.songs);
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

    fetchArtist();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <SearchCard />

      <div
        className="artist-header position-relative py-4 rounded-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,0,155,0.2) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="container py-2">
          <div className="row align-items-center border-0">
            <div className="col-md-3 text-center mb-4 mb-md-0">
              <img
                src={artist.image}
                className="rounded-circle shadow-lg border border-3 border-pink img-fluid artist-profile-img"
                style={{
                  objectFit: "cover",
                  width: "220px",
                  height: "220px",
                }}
              />
            </div>

            <div className="col-md-9">
              <span className="badge btn-pink mb-2">
                <i className="bi bi-patch-check-fill me-1"></i>Verified Artist
              </span>
              <h1 className="display-3 fw-bold text-white mb-3">
                {artist.name}
              </h1>

              <div
                className="artist-bio text-secondary mb-4"
                style={{
                  maxWidth: "700px",
                }}
              >
                {artist.bio || "No bio."}
              </div>

              <div className="d-flex gap-3">
                {songs.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-pink rounded-pill px-3 fw-bold shadow"
                    onClick={playAllSongs}
                  >
                    <i className="bi bi-play-fill fs-5 me-2"></i>Play All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {songs.length > 0 && (
        <div className="container pb-5">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="text-white mb-0 fw-bold">Popular Tracks</h4>
                <span className="text-secondary small">
                  {songs.length} Songs
                </span>
              </div>

              <div className="song-list-container rounded-4 overflow-hidden border border-secondary border-opacity-25 shadow-sm">
                {songs.map((song, index) => (
                  <SongList
                    key={song.id}
                    song={song}
                    index={index}
                    isActive={hasTrack && currentIndex === index}
                    onPlay={playSong}
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
        </div>
      )}
    </>
  );
}

export default ArtistDetail;
