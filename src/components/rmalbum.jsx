<Link
                            to={`/albums/${albumId}/remove/${song.id}`}
                            className="btn btn-link text-danger p-1 shadow-none"
                            onClick={(e) => {
                                e.stopPropagation();

                                if (
                                    !window.confirm(
                                        "Are you sure to remove this song?"
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        >

                            <i className="bi bi-trash scale-up"></i>

                        </Link>