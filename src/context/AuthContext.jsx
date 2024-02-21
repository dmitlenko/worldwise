import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "user@email.com",
  password: "password",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "login":
          return { ...state, user: action.payload, isAuthenticated: true };

        case "logout":
          return { ...state, user: null, isAuthenticated: false };

        default:
          throw new Error("Unknown action");
      }
    },
    {
      user: null,
      isAuthenticated: false,
    }
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider");

  return context;
};

export { AuthProvider, useAuth };
