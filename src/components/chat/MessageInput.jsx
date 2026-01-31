import React, { useState } from 'react';
import './MessageInput.css';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Здесь будет логика отправки сообщения
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      console.log('Voice message recorded and sent');
    }
  };

  return (
    <div className="message-input-container">
      <div className="input-actions">
        <button className="action-btn attach" title="Attach file">
          📎
        </button>
        <button className="action-btn photo" title="Send photo">
          📷
        </button>
        <button className="action-btn sticker" title="Send sticker">
          🎨
        </button>
        <button 
          className={`action-btn voice ${isRecording ? 'recording' : ''}`} 
          title={isRecording ? 'Stop recording' : 'Record voice message'}
          onClick={toggleRecording}
        >
          {isRecording ? '⏹️' : '🎤'}
        </button>
        <button className="action-btn game" title="Play game">
          🎮
        </button>
      </div>

      <div className="input-wrapper">
        <textarea
          className="message-textarea"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
        />
        {message && (
          <button className="clear-btn" onClick={() => setMessage('')}>
            ✕
          </button>
        )}
      </div>

      <button 
        className={`send-btn ${message ? 'active' : ''}`}
        onClick={handleSend}
        disabled={!message.trim()}
        title="Send message"
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;