import { useState } from "react";

function Login({ setInvoices }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 rounded-md bg-gray-800 text-white w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded-md font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
