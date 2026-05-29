import { Outlet } from "react-router-dom"

// CSS
import "./AuthLayout.css"

// Components
import Footer from "../components/Footer.jsx"

function AuthLayout() {
  return (
    <div className="d-flex align-items-center">
      <main className="m-auto mt-2">

        {/* Child */}
        <Outlet />

        {/* Footer */}
        <Footer />

      </main>
    </div>
  )
}

export default AuthLayout