import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Signup() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true)
            const res = await API.post(
                "/auth/signup",
                {
                    name,
                    email,
                    password
                }

            );

            login(res.data.data);

            navigate("/");

        }
        catch (err) {
            setError(
                err.response?.data?.message ||
                "Signup failed"
            );

        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="container">
            <div className="card auth-layout">
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

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit">

                        {loading ? "Loading..." : "Signup"}

                    </button>

                </form>


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