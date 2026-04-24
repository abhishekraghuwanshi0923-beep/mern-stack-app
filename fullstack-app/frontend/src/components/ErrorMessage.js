import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="error-close">×</button>
      )}
    </div>
  );
};

export default ErrorMessage;