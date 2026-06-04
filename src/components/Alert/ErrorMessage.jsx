function ErrorMessage({ message }) {
  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="text-center p-5 shadow-lg border-0">
        <div className="mb-5">
          <div className="spinner-grow text-danger" role="status"></div>
        </div>

        <i className="bi bi-x-circle display-1 text-danger mb-1"></i>

        <h3 className="text-danger fw-bold">Error 404</h3>

        <p className="text-secondary mb-4">{message}!</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
