import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Song from "./pages/Song/Song";
import SongDetail from "./pages/SongDetail/SongDetail";
import Artist from "./pages/Artist/Artist";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />

          <Route path="songs" element={<Song />} />
          <Route path="songs/:id" element={<SongDetail />} />
          <Route path="artists" element={<Artist />} />
          <Route path="artists/:id" element={<ArtistDetail />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
