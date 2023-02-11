import { useContext } from "react";
import authContext from "../context/AuthProvider";

export const useAuth = () => {
  return useContext(authContext);
};
