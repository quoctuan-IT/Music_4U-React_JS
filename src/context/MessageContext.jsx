import { createContext, useCallback, useContext, useState } from "react";

const MessageContext = createContext(null);

let messageId = 0;

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const removeMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  const showMessage = useCallback((text, type = "success") => {
    const id = ++messageId;
    setMessages((prev) => [...prev, { id, text, type }]);
    return id;
  }, []);

  const showSuccess = useCallback(
    (text) => showMessage(text, "success"),
    [showMessage],
  );

  const showError = useCallback(
    (text) => showMessage(text, "danger"),
    [showMessage],
  );

  const showWarning = useCallback(
    (text) => showMessage(text, "warning"),
    [showMessage],
  );

  const showInfo = useCallback(
    (text) => showMessage(text, "info"),
    [showMessage],
  );

  const value = {
    messages,
    showMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeMessage,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return context;
}
