import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../services/firebase';

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // When the user loggs in and out
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      // Here I can write to Firestore and read from it.
      
      console.log('Returned user Object from Firebase', user);
      //user.uid
      const { displayName, email } = user;
      setUser({
        displayName,
        email,
      });
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}

export default UserProvider;