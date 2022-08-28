import { createContext, useState } from 'react';

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const newUser = ({ user }) => {
    setUser(user);
  };

  return (
    <userContext.Provider value={{ user, newUser }}>
      {children}
    </userContext.Provider>
  );
};
