function Loading() {
  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="text-center p-5 shadow-lg border-0">
        <div className="mb-5">
          <div className="spinner-grow text-info" role="status"></div>
        </div>

        <i className="bi bi-hourglass-bottom display-1 text-info mb-1"></i>

        <h3 className="text-info fw-bold">Loading...</h3>

        <p className="text-secondary mb-4">Request Data loading...</p>
      </div>
    </div>
  );
}

export default Loading;
