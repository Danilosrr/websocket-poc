import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useUser() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser must be used inside a UserContext Provider");
  }

  return userContext;
}
