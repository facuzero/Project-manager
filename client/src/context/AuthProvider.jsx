import { createContext, useEffect, useState } from "react";
import { clientAxios } from "../config/clientAxios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return null;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      try {
        const { data } = await clientAxios.get("api/users/profile", config);
        setAuth(data.user);
      } catch (error) {
        console.error(error.response?.data);
        sessionStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    authUser();
  }, []);

  return (
    <authContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider };

export default authContext;
