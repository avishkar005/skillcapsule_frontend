import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(email.trim(), password);

      navigate("/dashboard");

    } catch (err) {

      setError(err.message || "Invalid email or password");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign in to your account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Mail size={18} className="text-gray-400 mr-2" />

              <input
                type="email"
                required
                className="w-full p-2 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type="password"
                required
                className="w-full p-2 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* Google Login */}
        <a
          href={`${API_BASE}/oauth2/authorization/google`}
          className="block text-center mt-4 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Continue with Google
        </a>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}