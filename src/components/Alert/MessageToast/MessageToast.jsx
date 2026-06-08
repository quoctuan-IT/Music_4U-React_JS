import { useEffect } from "react";

import { useMessage } from "../../../context/MessageContext";

import "./MessageToast.css";

const ICONS = {
  success: "bi-check2-circle",
  danger: "bi-exclamation-circle",
  warning: "bi-exclamation-triangle",
  info: "bi-info-circle",
};

function MessageToast() {
  const { messages, removeMessage } = useMessage();

  useEffect(() => {
    if (messages.length === 0) return;

    const timers = messages.map((message) =>
      setTimeout(() => removeMessage(message.id), 3000),
    );

    return () => timers.forEach(clearTimeout);
  }, [messages, removeMessage]);

  if (messages.length === 0) return null;

  return (
    <div className="message-holder container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`alert alert-${message.type} alert-dismissible fade show custom-alert shadow-sm`}
          role="alert"
        >
          <div className="d-flex align-items-center">
            <div className="alert-icon me-3">
              <i className={`bi ${ICONS[message.type] || ICONS.info}`}></i>
            </div>
            <div className="alert-text fw-medium">{message.text}</div>
          </div>
          <button
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
            onClick={() => removeMessage(message.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default MessageToast;
