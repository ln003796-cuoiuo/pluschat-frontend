import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import AppearanceSettings from './AppearanceSettings';
import PrivacySettings from './PrivacySettings';
import './Settings.css';

const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'appearance', icon: '🎨', label: 'Appearance' },
    { id: 'privacy', icon: '🔒', label: 'Privacy & Security' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'storage', icon: '💾', label: 'Storage & Data' },
    { id: 'developer', icon: '🔧', label: 'Developer Tools' }
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize your PlusChat experience</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && <ProfileSettings user={user} />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'notifications' && <NotificationsSettings />}
          {activeTab === 'storage' && <StorageSettings />}
          {activeTab === 'developer' && <DeveloperSettings user={user} />}
        </div>
      </div>
    </div>
  );
};

// Заглушка для остальных настроек
const NotificationsSettings = () => (
  <div className="settings-section">
    <h2>🔔 Notifications</h2>
    <p>Coming soon...</p>
  </div>
);

const StorageSettings = () => (
  <div className="settings-section">
    <h2>💾 Storage & Data</h2>
    <p>Coming soon...</p>
  </div>
);

const DeveloperSettings = ({ user }) => (
  <div className="settings-section">
    <h2>🔧 Developer Tools</h2>
    <p>Exclusive tools for {user?.email}</p>
  </div>
);

export default Settings;