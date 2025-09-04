import React, { createContext, useContext } from "react";
import { createLogger } from "../utils/logger";

const LoggingContext = createContext();

export const LoggingProvider = ({ children }) => {
  const logHandler = (level, message, data) => {
    const log = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
    // Instead of console.log → push to state / localStorage / server
    localStorage.setItem("appLogs", JSON.stringify([
      ...(JSON.parse(localStorage.getItem("appLogs")) || []),
      log,
    ]));
  };

  const logger = createLogger(logHandler);

  return (
    <LoggingContext.Provider value={logger}>
      {children}
    </LoggingContext.Provider>
  );
};

export const useLogger = () => useContext(LoggingContext);
