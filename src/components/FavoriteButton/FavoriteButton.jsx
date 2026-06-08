import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function resolveIsFavorite(songId, song, user, initialIsFavorite) {
  if (initialIsFavorite !== undefined) return initialIsFavorite;
  if (song?.is_favorite !== undefined) return song.is_favorite;
  if (user?.favorite_songs?.some((item) => item.id === songId)) return true;
  return false;
}

function FavoriteButton({
  songId,
  song,
  initialIsFavorite,
  className,
  style,
  stopPropagation = false,
}) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(() =>
    resolveIsFavorite(songId, song, user, initialIsFavorite),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(
      resolveIsFavorite(songId, song, user, initialIsFavorite),
    );
  }, [songId, song, user, initialIsFavorite]);

  const handleClick = async (e) => {
    if (stopPropagation) e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await api.post(`/songs/${songId}/favorite/`);
      setIsFavorite(response.data.is_favorite);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={className}
      data-song-id={songId}
      style={style}
      onClick={handleClick}
      disabled={loading}
    >
      <i
        className={
          isFavorite
            ? "bi bi-heart-fill text-danger"
            : "bi bi-heart text-pink"
        }
      />
    </button>
  );
}

export default FavoriteButton;
