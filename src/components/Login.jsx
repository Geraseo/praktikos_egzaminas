import React, { useState } from "react";
import { auth } from "../firebase";

const LoginModal = ({ closeLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Log in the user using Firebase authentication
      await auth.signInWithEmailAndPassword(email, password);
      console.log("Login successful!");

      // Additional logic after successful login (e.g., redirect)
      closeLoginModal(); // Close the modal after successful login
    } catch (error) {
      console.log(error);
      console.log("Login failed!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Login
        </button>
        <button
          onClick={closeLoginModal}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
