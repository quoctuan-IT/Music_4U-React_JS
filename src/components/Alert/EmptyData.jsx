import { Link } from "react-router-dom";

function EmptyData() {
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className="bi bi-search display-5 text-danger"></i>
      </div>

      <h4 className="mb-2 text-danger">No Data Found</h4>

      <p className="text-secondary mb-4">We couldn't find any data.</p>

      <Link to="/" className="btn btn-outline-pink rounded-pill px-4">
        <i className="bi bi-house-door me-2"></i>
        Home
      </Link>
    </div>
  );
}

export default EmptyData;
