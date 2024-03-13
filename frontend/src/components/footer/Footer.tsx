import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div
                style={{
                    width: "100%",
                    minHeight: "20vh",
                    maxHeight: "30vh",
                    marginTop: 60,
                }}>
                <p
                    style={{
                        fontSize: "20px",
                        textAlign: "center",
                        padding: "20px",
                    }}>
                    Built By
                    <span>
                        <Link
                            style={{ color: "white" }}
                            className="nav-link"
                            to={
                                "https://www.linkedin.com/in/shixin-tang-4502b22a1"
                            }>
                            Shixin Tang
                        </Link>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
