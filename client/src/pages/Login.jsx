import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/sign_in`, {
                method: "POST",
                credentials: "include", // needed for cookie error in console
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: { email, password } }),
            });

            if (res.status === 401) {
                setError("Invalid credentials");
                return;
            }

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();
            if (!data || !data.user) throw new Error("Invalid response from server");

            // Set user state
            setUser(data.user);

            // Redirecting to dashboard
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full mb-4"
                    required
                />
                <button type="submit" className="btn w-full btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
