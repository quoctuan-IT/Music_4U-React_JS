import { Link } from "react-router-dom";

function Profile() {

    const user = {
        username: "QuocTuan",
        email: "quoctuan@example.com",
        dateJoined: "May 20, 2025",
        isStaff: true,
    };

    return (

        <div className="container py-5 mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    {/* Profile Header Card */}
                    <div className="card bg-dark border-0 shadow-lg rounded-4 overflow-hidden mb-4 shadow-pink-glow">
                        <div
                            className="card-header border-0 py-2 text-center"
                            style={{
                                background:
                                    "linear-gradient(45deg, #ff2d55, #000)",
                            }}
                        >
                            <div className="position-relative d-inline-block mb-3">

                                <i className="bi bi-person-circle display-1 text-white"></i>

                                <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-light rounded-circle shadow-sm">

                                    <span className="visually-hidden">
                                        Online
                                    </span>

                                </span>

                            </div>

                            <h2 className="fw-bold text-white mb-0">
                                {user.username}
                            </h2>

                            <p className="text-white-50 mb-0">
                                {user.isStaff
                                    ? "Administrator"
                                    : "Music Enthusiast"}
                            </p>
                        </div>

                        <div className="card-body p-4 bg-black text-white">
                            <div className="row text-center g-4">

                                <div className="col-md-6 border-end border-secondary border-opacity-25">
                                    <small className="text-secondary d-block text-uppercase mb-1 fw-bold ls-1">
                                        Email Address
                                    </small>

                                    <div className="fw-semibold fs-5">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <small className="text-secondary d-block text-uppercase mb-1 fw-bold ls-1">
                                        Member Since
                                    </small>
                                    <div className="fw-semibold fs-5">
                                        {user.dateJoined}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Dashboard */}
                    <h4 className="text-white mb-4 fw-bold px-2">
                        Dashboard
                    </h4>

                    <div className="row g-3">

                        {/* Favorites */}
                        <div className="col-md-4">
                            <Link
                                to="/favorite"
                                className="dashboard-card group text-decoration-none"
                            >
                                <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                                    <div className="card-body p-4 text-center">

                                        <div className="icon-box mb-3 bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3">
                                            <i className="bi bi-heart-fill text-danger fs-2"></i>
                                        </div>

                                        <h5 className="text-white fw-bold mb-1">
                                            Favorites
                                        </h5>

                                        <p className="text-secondary small mb-0">
                                            Your saved tracks
                                        </p>

                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Albums */}
                        <div className="col-md-4">
                            <Link
                                to="/albums"
                                className="dashboard-card group text-decoration-none"
                            >
                                <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                                    <div className="card-body p-4 text-center">

                                        <div className="icon-box mb-3 bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                                            <i className="bi bi-collection-play-fill text-primary fs-2"></i>
                                        </div>

                                        <h5 className="text-white fw-bold mb-1">
                                            Albums
                                        </h5>

                                        <p className="text-secondary small mb-0">
                                            Manage your playlists
                                        </p>

                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Admin Panel */}
                        {user.isStaff && (

                            <div className="col-md-4">
                                <a
                                    href="/admin"
                                    className="dashboard-card group text-decoration-none"
                                >
                                    <div className="card bg-dark border-0 h-100 rounded-4 transition-all">
                                        <div className="card-body p-4 text-center">

                                            <div className="icon-box mb-3 bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3">

                                                <i className="bi bi-shield-lock-fill text-warning fs-2"></i>

                                            </div>

                                            <h5 className="text-white fw-bold mb-1">
                                                Admin
                                            </h5>

                                            <p className="text-secondary small mb-0">
                                                System settings
                                            </p>

                                        </div>
                                    </div>
                                </a>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Profile;