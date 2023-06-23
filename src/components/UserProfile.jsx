import React, { useState, useEffect } from "react";
import { firestore, auth } from "../firebase";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore
            .collection("users")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUsername(userData.username);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUsername();
      } else {
        setUsername(""); // Reset the username
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return <p className="text-white">Welcome, {username}</p>;
};

export default UserProfile;
