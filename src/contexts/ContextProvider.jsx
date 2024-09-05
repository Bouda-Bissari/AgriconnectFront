import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  roles: [], 
  token: null,
  isCompleted: null, 
  isActive: null, 

  setUser: () => {},
  setRoles: () => {}, 
  setToken: () => {},
  setIsCompleted: () => {},
  setIsActive: () => {}, 
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER_ID")) || {});
  const [roles, _setRoles] = useState(JSON.parse(localStorage.getItem("USER_ROLES")) || []);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isCompleted, _setIsCompleted] = useState(
    JSON.parse(localStorage.getItem("USER_COMPLETED")) || false
  );
  const [isActive, _setIsActive] = useState(
    JSON.parse(localStorage.getItem("USER_ACTIVE")) || false
  );

  const setUser = (user) => {
    _setUser(user);

    // Stockage de l'ID de l'utilisateur
    if (user && user.id) {
      localStorage.setItem("USER_ID", JSON.stringify(user.id));
    } else {
      localStorage.removeItem("USER_ID");
    }
  };
  
  const setRoles = (roles) => {
    _setRoles(roles);

    if (roles && roles.length > 0) {
      localStorage.setItem("USER_ROLES", JSON.stringify(roles));
    } else {
      localStorage.removeItem("USER_ROLES");
    }
  };

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setIsCompleted = (isCompleted) => {
    _setIsCompleted(isCompleted);

    if (isCompleted) {
      localStorage.setItem("USER_COMPLETED", JSON.stringify(isCompleted));
    } else {
      localStorage.removeItem("USER_COMPLETED");
    }
  };

  const setIsActive = (isActive) => {
    _setIsActive(isActive);

    if (isActive) {
      localStorage.setItem("USER_ACTIVE", JSON.stringify(isActive));
    } else {
      localStorage.removeItem("USER_ACTIVE");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        roles,
        token,
        isCompleted,
        isActive, // Add isActive to the context
        setRoles,
        setUser,
        setToken,
        setIsCompleted,
        setIsActive, // Add setIsActive to the context
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UserContext = () => useContext(StateContext);
