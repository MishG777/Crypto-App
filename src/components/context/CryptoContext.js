import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("usd");
  const [symb, setSymb] = useState("$");

  useEffect(() => {
    if (currency === "usd") {
      setSymb("$");
    } else if (currency === "eur") {
      setSymb("€");
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symb, setcurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
