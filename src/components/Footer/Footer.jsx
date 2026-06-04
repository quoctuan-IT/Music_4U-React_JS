function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        
        <div className="container">
            <hr className="my-4" />

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <p className="mb-2">
                        Developed by { }
                        <strong className="mb-2 text-danger">
                            Phạm Quốc Tuấn ❤️
                        </strong>
                    </p>

                    <p className="mb-2">
                        IT - Saigon University
                    </p>

                    <p className="mb-4">
                        &copy; {currentYear} Music Web. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default Footer;