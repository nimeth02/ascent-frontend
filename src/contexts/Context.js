import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const Provider = ({ children }) => {
  // Add global states here
  const [loggedUser, setLoggedUser] = useState(null);


  return (
    <Context.Provider
      value={{
        // return states here
        loggedUser, setLoggedUser
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCustomContext must be used within a Provider");
  }
  return context;
};
