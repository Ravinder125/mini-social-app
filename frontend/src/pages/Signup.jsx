import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Signup() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/signup",
                {
                    name,
                    email,
                    password
                }

            );

            login(res.data.data);

            navigate("/social");

        }
        catch (err) {
            setError(
                err.response?.data?.message ||
                "Signup failed"
            );

        }

    };

    return (
        <div className="container">
            <div className="card">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">

                        Signup

                    </button>

                </form>

                {error && <p>{error}</p>}

                <p>

                    Already have account?

                    <Link to="/">

                        Login

                    </Link>

                </p>

            </div>
        </div>

    );

}

export default Signup;