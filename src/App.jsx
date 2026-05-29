import { Routes, Route, BrowserRouter } from "react-router-dom"

// Components
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"

import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="artists" element={<Home />} />
          <Route path="songs" element={<Home />} />
          <Route path="profile" element={<Home />} />
          <Route path="logout" element={<Home />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App