import React from 'react';
import './Sidebar.css';

const menuItems = [
  { id: 'chats', icon: '💬', label: 'Chats' },
  { id: 'contacts', icon: '👥', label: 'Contacts' },
  { id: 'groups', icon: '👥', label: 'Groups' },
  { id: 'channels', icon: '📢', label: 'Channels' },
  { id: 'calls', icon: '📞', label: 'Calls' },
  { id: 'files', icon: '📁', label: 'Files' },
  { id: 'stickers', icon: '🎨', label: 'Stickers' },
  { id: 'settings', icon: '⚙️', label: 'Settings' }
];

const Sidebar = ({ activeSection, setActiveSection, developerMode, user }) => {
  return (
    <div className="sidebar">
      <div className="profile-card">
        <div className="avatar">
          <span>{user?.email?.charAt(0).toUpperCase() || '👤'}</span>
        </div>
        <div className="profile-info">
          <h2>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h2>
          <p>{user?.email}</p>
          {developerMode && <div className="developer-badge">👑 Developer</div>}
        </div>
      </div>

      <div className="nav-menu">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.id === 'chats' && <span className="badge">12</span>}
          </div>
        ))}
      </div>

      {developerMode && (
        <div className="developer-section">
          <div className="section-title">🔧 DEVELOPER TOOLS</div>
          <div className="nav-item">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Join Any Group</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📢</span>
            <span className="nav-label">Broadcast</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-label">Analytics</span>
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <button className="action-btn">💬</button>
        <button className="action-btn">📞</button>
        <button className="action-btn">📹</button>
        <button className="action-btn">⚙️</button>
      </div>
    </div>
  );
};

export default Sidebar;