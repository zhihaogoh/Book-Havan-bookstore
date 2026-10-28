import { createContext, useContext, useEffect, useState } from "react";
import { getUser, handleLogin, handleLogout } from "../auth/auth";
import PropTypes from "prop-types";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    //登录之后就拿到user data
    const restoreSession = async () => {
      try {
        const response = await getUser();
        if (active) {
          setUser(response.data ?? response);
        }
      } catch (error) {
        console.error("Restore session failed:", error);
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const loginUser = async (credentials) => {
    // 1. Login
    await handleLogin(credentials.email, credentials.password);

    // 2. Get authenticated user
    const user = await getUser();
    // 3. Update React state
    setUser(user.data ?? user);

    // 4. Return user
    return user.data ?? user;
  };

  const logoutUser = async () => {
    try {
      await handleLogout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return(
    <AuthContext.Provider
        value={{
            user,
            loading,
            loginUser,
            logoutUser,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }
    return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
