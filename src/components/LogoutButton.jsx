import React from "react";
import { auth } from "../firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-error text-white rounded p-2"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
