import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  roles: [], 
  token: null,
  setUser: () => {},
  setRoles: () => {}, 
  setToken: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER_ID")) || {});
  const [roles, _setRoles] = useState(JSON.parse(localStorage.getItem("USER_ROLES")) || []);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setUser = (user) => {
    _setUser(user);

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

  return (
    <StateContext.Provider
      value={{
        user,
        roles,
        setRoles,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UserContext = () => useContext(StateContext);
