import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid gray",
                marginBottom: "20px"
            }}
        >

            <h3>
                Mini Social
            </h3>

            <div>
                            <span>
                                {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    marginLeft: "10px"
                                }}
                            >
                                Logout
                            </button>

            </div>

        </div>

    );

}

export default Navbar;