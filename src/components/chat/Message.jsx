import React from 'react';
import './Message.css';

const Message = ({ message, isCurrentUser, isPremium }) => {
  return (
    <div className={`message-container ${isCurrentUser ? 'current-user' : ''}`}>
      {!isCurrentUser && (
        <div className="message-avatar">
          {message.sender?.charAt(0).toUpperCase() || '👤'}
        </div>
      )}
      
      <div className={`message-bubble ${isCurrentUser ? 'yours' : 'theirs'} ${isPremium ? 'premium' : ''}`}>
        <div className="message-content">
          {message.text}
        </div>
        
        <div className="message-footer">
          <span className="message-time">{message.time}</span>
          {isCurrentUser && (
            <span className="message-status">
              {message.status === 'sent' && '✓'}
              {message.status === 'delivered' && '✓✓'}
              {message.status === 'read' && (
                <span className="read-status">✓✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;