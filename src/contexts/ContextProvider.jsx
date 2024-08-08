import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  role: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER_ID")) || {});
  const [role, setRole] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setUser = (user) => {
    _setUser(user);

    if (user && user.id) {
      localStorage.setItem("USER_ID", JSON.stringify(user.id));
    } else {
      localStorage.removeItem("USER_ID");
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
        role,
        setRole,
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
