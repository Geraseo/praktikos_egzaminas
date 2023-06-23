import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import EventCards from "./components/EventCards";
import { auth, firestore } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userSnapshot = await firestore
          .collection("users")
          .doc(user.uid)
          .get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          const { role } = userData;
          const userWithRole = { ...user, role };
          setUser(userWithRole);
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log("User:", user); // Check if user state is being set correctly

  return (
    <div className="h-full">
      <Nav />
      <EventCards user={user} />
    </div>
  );
}

export default App;
