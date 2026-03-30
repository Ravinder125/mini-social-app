import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await API.post(
                "/auth/login",
                {
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
                "Login failed"
            );

        } finally {
            setLoading(false)
        }

    };

    return (

        <div className="container">
            <div className="card auth-layout">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

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

                        {loading ? "Loading..." : "Login"}

                    </button>

                </form>


                <p>

                    No account?

                    <Link to="/signup">

                        Signup

                    </Link>

                </p>

            </div >
        </div>

    );

}

export default Login;