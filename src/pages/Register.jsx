import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {

      setLoading(true);
      setError("");

      await register({
        name: form.name,
        email: form.email,
        password: form.password
      });

      navigate("/dashboard");

    } catch (err) {

      setError(err.message || "Registration failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create your account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <User size={18} className="text-gray-400 mr-2" />

              <input
                type="text"
                required
                className="w-full p-2 outline-none"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
          </div>

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
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
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
                placeholder="Create password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type="password"
                required
                className="w-full p-2 outline-none"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={(e) =>
                  setForm({ ...form, confirm: e.target.value })
                }
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}