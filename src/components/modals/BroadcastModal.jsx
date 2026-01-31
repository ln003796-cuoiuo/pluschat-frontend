import React, { useState } from 'react';
import './Modal.css';

const BroadcastModal = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [audience, setAudience] = useState('all');
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [sending, setSending] = useState(false);

  const priorityOptions = [
    { id: 'normal', label: 'Normal', icon: '🔵', color: '#00F3FF' },
    { id: 'high', label: 'High Priority', icon: '🟡', color: '#FFAA00' },
    { id: 'emergency', label: 'Emergency', icon: '🔴', color: '#FF4444' }
  ];

  const audienceOptions = [
    { id: 'all', label: 'All Users', icon: '👥', count: '1,247' },
    { id: 'premium', label: 'Premium Users Only', icon: '⭐', count: '342' },
    { id: 'free', label: 'Free Users Only', icon: '🆓', count: '905' }
  ];

  const handleSend = () => {
    if (!message.trim()) {
      alert('Please enter a message to broadcast!');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      alert(`✅ Broadcast sent successfully!\n\n` +
            `Priority: ${priority}\n` +
            `Audience: ${audience} (${audienceOptions.find(a => a.id === audience)?.count} users)\n` +
            `Message: "${message}"`);
      onClose();
    }, 1500);
  };

  const getMessagePreview = () => {
    if (!message.trim()) return 'Type your broadcast message here...';
    return message.length > 100 ? message.substring(0, 100) + '...' : message;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content broadcast-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">📢</div>
          <h2>System Broadcast</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Send a system-wide message to all users. Use responsibly!
          </p>

          <div className="broadcast-form">
            <div className="form-row">
              <label>Priority Level</label>
              <div className="priority-options">
                {priorityOptions.map(opt => (
                  <button
                    key={opt.id}
                    className={`priority-btn ${priority === opt.id ? 'active' : ''}`}
                    onClick={() => setPriority(opt.id)}
                    style={{ borderColor: opt.color }}
                  >
                    <span className="priority-icon" style={{ color: opt.color }}>
                      {opt.icon}
                    </span>
                    <span className="priority-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <label>Audience</label>
              <div className="audience-options">
                {audienceOptions.map(opt => (
                  <button
                    key={opt.id}
                    className={`audience-btn ${audience === opt.id ? 'active' : ''}`}
                    onClick={() => setAudience(opt.id)}
                  >
                    <span className="audience-icon">{opt.icon}</span>
                    <span className="audience-label">{opt.label}</span>
                    <span className="audience-count">{opt.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <label>Broadcast Message</label>
              <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="broadcast-textarea"
                rows="6"
              />
              <div className="char-counter">
                {message.length}/500 characters
              </div>
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={requiresConfirmation}
                  onChange={(e) => setRequiresConfirmation(e.target.checked)}
                />
                <span>Require user confirmation before showing</span>
              </label>
            </div>
          </div>

          <div className="message-preview">
            <h4>Preview</h4>
            <div className={`preview-bubble priority-${priority}`}>
              <div className="preview-header">
                <span className="preview-icon">📢</span>
                <span className="preview-title">System Broadcast</span>
                <span className="preview-priority">
                  {priorityOptions.find(p => p.id === priority)?.icon}
                </span>
              </div>
              <div className="preview-message">
                {getMessagePreview()}
              </div>
              <div className="preview-footer">
                Requires confirmation: {requiresConfirmation ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              ❌ Cancel
            </button>
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={sending || !message.trim()}
            >
              {sending ? '📤 Sending...' : `📤 Send to ${audienceOptions.find(a => a.id === audience)?.count} users`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastModal;