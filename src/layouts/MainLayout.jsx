import { Outlet } from "react-router-dom"

// CSS
import "./MainLayout.css"

// Components
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

function MainLayout() {
  return (
    <div class="d-flex flex-column min-vh-100">

      {/* Header */}
      <Header />

      {/* Child */}
      <main className="flex-grow-1 container mt-5">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default MainLayout