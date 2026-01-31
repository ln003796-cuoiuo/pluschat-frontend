import React, { useState } from 'react';
import './Header.css';

const Header = ({ user, developerMode, onSearch, onNotifications, onProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="chat-header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">💬</span>
          <h1 className="logo-text">PlusChat</h1>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search messages, contacts, groups..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {developerMode && (
          <button className="dev-badge" onClick={() => alert('Developer Mode Active')}>
            👑 Developer
          </button>
        )}
        
        <button className="header-btn" onClick={onNotifications}>
          🔔
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-menu" onClick={onProfile}>
          <div className="user-avatar">
            {user?.email?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div className="user-info">
            <div className="user-name">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="user-status">Online</div>
          </div>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;