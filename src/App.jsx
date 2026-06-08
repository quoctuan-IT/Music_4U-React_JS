import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import MessageToast from "./components/Alert/MessageToast/MessageToast";

import Search from "./pages/Search/Search";
import Song from "./pages/Song/Song";
import SongDetail from "./pages/SongDetail/SongDetail";
import Artist from "./pages/Artist/Artist";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
// User
import Profile from "./pages/Profile/Profile";
import Favorite from "./pages/Favorite/Favorite";
import Album from "./pages/Album/Album";
import AlbumCreate from "./pages/AlbumCreate/AlbumCreate";
import AlbumDetail from "./pages/AlbumDetail/AlbumDetail";
// Auth
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <MessageToast />
          <Routes>
            {/* Home */}
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />

              <Route path="search" element={<Search />} />
              <Route path="songs" element={<Song />} />
              <Route path="song/:id" element={<SongDetail />} />
              <Route path="artists" element={<Artist />} />
              <Route path="artists/:id" element={<ArtistDetail />} />

              <Route path="profile" element={<Profile />} />
              <Route path="favorites" element={<Favorite />} />
              <Route path="albums" element={<Album />} />
              <Route path="album/create" element={<AlbumCreate />} />
              <Route path="album/:id" element={<AlbumDetail />} />
            </Route>

            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
