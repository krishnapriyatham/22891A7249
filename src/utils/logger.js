export const createLogger = (logHandler) => {
  return {
    info: (msg, data) => logHandler("INFO", msg, data),
    error: (msg, data) => logHandler("ERROR", msg, data),
    warn: (msg, data) => logHandler("WARN", msg, data),
  };
};
