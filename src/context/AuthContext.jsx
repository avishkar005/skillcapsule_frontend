import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCapsules, setPurchasedCapsules] = useState([]);
  const [progress, setProgress] = useState({});

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedPurchases = localStorage.getItem("purchasedCapsules");
    const storedProgress = localStorage.getItem("progress");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedPurchases) {
      setPurchasedCapsules(JSON.parse(storedPurchases));
    }

    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }

    setLoading(false);

  }, []);

  const login = async (email, password) => {

    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      provider: "LOCAL"
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    return userData;
  };

  const register = async (formData) => {

    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name?.trim(),
        email: formData.email?.trim(),
        password: formData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      provider: "LOCAL"
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const purchaseCapsule = (capsule) => {

    const updated = [
      ...purchasedCapsules,
      {
        ...capsule,
        purchaseDate: new Date().toISOString(),
        progress: 0
      }
    ];

    setPurchasedCapsules(updated);
    localStorage.setItem("purchasedCapsules", JSON.stringify(updated));
  };

  const updateProgress = (capsuleId, value) => {

    const newProgress = {
      ...progress,
      [capsuleId]: value
    };

    setProgress(newProgress);
    localStorage.setItem("progress", JSON.stringify(newProgress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        purchasedCapsules,
        purchaseCapsule,
        progress,
        updateProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};