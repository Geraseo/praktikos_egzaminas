import React, { useState } from "react";
import { auth, firestore } from "../firebase";

const RegisterModal = ({ closeRegModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Register the user using Firebase authentication
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Create a document in Firestore for the registered user
      const userRef = firestore.collection("users").doc(user.uid);
      await userRef.set({
        username: username,
        email: email,
        role: "simple_user",
      });

      // Close the modal
      closeRegModal();
    } catch (error) {
      console.log(error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow w-64">
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
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
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block mb-1"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 w-full"
        >
          Register
        </button>
        <button
          onClick={closeRegModal}
          className="ml-2 text-gray-500 hover:text-gray-700 ms-20 mt-5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
