"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Parolele nu se potrivesc!");
      return;
    }
    // Aici poți adăuga logica de actualizare a parolei (API call)
    setMessage("Parola a fost schimbată cu succes!");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Schimbă Parola</h2>
        {message && <p className="text-red-500 text-center mb-2">{message}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-gray-700">Parola Veche</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Parola Nouă</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmă Parola Nouă</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Salvează Modificările
          </button>
        </form>
      </div>
    </div>
  );
}
