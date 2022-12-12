import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export default function useAlert() {
  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("useAlert must be used inside a AlertContext Provider");
  }

  return alertContext;
}