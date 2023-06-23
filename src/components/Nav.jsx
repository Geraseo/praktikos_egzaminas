import React, { useState, useEffect } from "react";
import "../index.css";
import { auth } from "../firebase";

import RegisterModal from "./Register";
import LoginModal from "./Login";
import LogoutButton from "./LogoutButton";
import UserProfile from "./UserProfile";
import EventRegistrationModal from "./EventRegistrationModal";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // reg modal
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const openRegModal = () => {
    setIsRegModalOpen(true);
  };
  const closeRegModal = () => {
    setIsRegModalOpen(false);
  };

  // login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Event Registration Modal
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const openNewEventModal = () => {
    setIsNewEventModalOpen(true);
  };
  const closeNewEventModal = () => {
    setIsNewEventModalOpen(false);
  };

  // console.log(user);
  return (
    <div
      id="NavBar"
      className="h-1/6 bg-gray-900 flex flex-row justify-between items-center border-b-8 border-main"
    >
      <img
        src="https://drive.google.com/uc?export=view&id=14QOjF7QZE5gxW9upTRpR6bju_jIpqgPQ"
        alt=""
        width="20%"
        height="20%"
        className="ms-5"
      />

      {/* new event stuff */}
      {user && !isNewEventModalOpen && (
        <button
          onClick={openNewEventModal}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Register Event
        </button>
      )}
      {/* Render the event registration modal */}
      {isNewEventModalOpen && (
        <EventRegistrationModal closeNewEventModal={closeNewEventModal} />
      )}

      {/* user status stuff */}
      <div className="p-2 h-full flex justify-end flex-col items-end">
        {!user && (
          <>
            {/* if user is logged out */}
            <p className="text-white"> user is logged out </p>
            <button
              className="bg-main rounded p-2 m-1"
              onClick={openRegModal}
            >
              Register
            </button>
            {isRegModalOpen && <RegisterModal closeRegModal={closeRegModal} />}
            <button
              className="bg-main rounded p-2 m-1"
              onClick={openLoginModal}
            >
              Login
            </button>

            {isLoginModalOpen && (
              <LoginModal closeLoginModal={closeLoginModal} />
            )}
          </>
        )}
        {user && (
          <>
            {/* if user is logged in show logout btn */}
            <UserProfile user={user} />
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
