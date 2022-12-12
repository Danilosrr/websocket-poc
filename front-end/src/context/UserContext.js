import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [room, setRoom] = useState('Sala');
  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={{ room, setRoom, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
