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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/auth/login",
                {
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
                "Login failed"
            );

        }

    };

    return (

        <div>

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

                <button type="submit">

                    Login

                </button>

            </form>

            {error && <p>{error}</p>}

            <p>

                No account?

                <Link to="/signup">

                    Signup

                </Link>

            </p>

        </div>

    );

}

export default Login;