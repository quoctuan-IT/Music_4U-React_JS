import { useRef, useState } from "react";

// CSS
import "./MusicPlayer.css";

// Resources
import reactLogo from "../../assets/react.svg";

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function MusicPlayer({
  audioRef,
  track,
  onTogglePlay,
  onPrevious,
  onNext,
  onEnded,
}) {
  const coverRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    if (coverRef.current) {
      coverRef.current.style.animationPlayState = "running";
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (coverRef.current) {
      coverRef.current.style.animationPlayState = "paused";
    }
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio?.duration) return;

    const per = (audio.currentTime / audio.duration) * 100;
    setProgress(per);
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;

    const per = Number(e.target.value);
    audio.currentTime = (per / 100) * audio.duration;
    setProgress(per);
  };

  return (
    <div className="card border border-secondary border-opacity-25 shadow-lg rounded-4 overflow-hidden shadow-pink-glow">
      <div className="card-body p-4 text-center">
        <h6 className="text-pink text-uppercase tracking-widest small fw-bold mb-4">
          Now Playing
        </h6>

        <div className="player-disc-wrapper mb-4 position-relative d-inline-block">
          <div className="disc-hole"></div>
          <img
            id="playerCover"
            ref={coverRef}
            src={track?.cover ?? reactLogo}
            className="rounded-circle shadow-lg border border-5 border-white rotate-anim"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>

        <h5 id="nowPlaying" className="text-white fw-bold text-truncate mb-1">
          {track?.title ?? "Select a track"}
        </h5>
        <p id="nowArtist" className="text-secondary small mb-4">
          {track?.artist ?? "Ready to play"}
        </p>

        <audio
          id="audioPlayer"
          ref={audioRef}
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onEnded}
        />

        <div className="px-2 mb-4">
          <input
            type="range"
            className="form-range custom-range"
            id="progressBar"
            value={progress}
            min="0"
            max="100"
            onInput={handleSeek}
          />
          <div className="d-flex justify-content-between mt-1">
            <span id="currentTime" small>
              {formatTime(currentTime)}
            </span>
            <span id="durationTime" small>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4">
          <button
            type="button"
            className="btn btn-close-white p-0 hover-pink"
            onClick={onPrevious}
          >
            <i className="bi bi-skip-start-fill fs-2"></i>
          </button>

          <button
            type="button"
            className="btn btn-close-white rounded-circle d-flex align-items-center justify-content-center shadow-lg play-btn"
            onClick={onTogglePlay}
            id="mainPlayBtn"
          >
            <i
              className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} fs-2`}
              id="playIcon"
            />
          </button>

          <button
            type="button"
            className="btn btn-close-white p-0 hover-pink"
            onClick={onNext}
          >
            <i className="bi bi-skip-end-fill fs-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
