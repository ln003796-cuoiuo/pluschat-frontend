import React, { useState } from 'react';
import './PrivacySettings.css';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    onlineStatus: 'everyone',
    profilePhoto: 'everyone',
    addToGroups: 'everyone',
    readReceipts: true,
    lastSeen: 'everyone',
    forwardMessages: true,
    twoFactorAuth: false,
    biometricLock: false,
    autoDeleteMessages: 'never',
    saveToCloud: true,
    allowCalls: 'everyone'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    console.log(`Privacy setting changed: ${key} = ${value}`);
  };

  const visibilityOptions = [
    { id: 'everyone', label: 'Everyone', icon: '🌐' },
    { id: 'contacts', label: 'My Contacts', icon: '👥' },
    { id: 'nobody', label: 'Nobody', icon: '🔒' }
  ];

  const autoDeleteOptions = [
    { id: 'never', label: 'Never', icon: '♾️' },
    { id: '7days', label: 'After 7 days', icon: '7️⃣' },
    { id: '30days', label: 'After 30 days', icon: '📅' },
    { id: '90days', label: 'After 90 days', icon: '3️⃣' }
  ];

  const callOptions = [
    { id: 'everyone', label: 'Everyone', icon: '📞' },
    { id: 'contacts', label: 'My Contacts', icon: '👥' },
    { id: 'nobody', label: 'Nobody', icon: '🔇' }
  ];

  return (
    <div className="privacy-settings">
      <div className="settings-card">
        <h3>👁️ Privacy Controls</h3>
        <p className="section-description">
          Control who can see your information and contact you
        </p>

        <div className="privacy-section">
          <h4>Who can see my...</h4>
          
          <div className="privacy-option">
            <label>Online Status</label>
            <div className="option-buttons">
              {visibilityOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${settings.onlineStatus === opt.id ? 'active' : ''}`}
                  onClick={() => handleSettingChange('onlineStatus', opt.id)}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="privacy-option">
            <label>Profile Photo</label>
            <div className="option-buttons">
              {visibilityOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${settings.profilePhoto === opt.id ? 'active' : ''}`}
                  onClick={() => handleSettingChange('profilePhoto', opt.id)}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="privacy-option">
            <label>Last Seen</label>
            <div className="option-buttons">
              {visibilityOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${settings.lastSeen === opt.id ? 'active' : ''}`}
                  onClick={() => handleSettingChange('lastSeen', opt.id)}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="privacy-option">
            <label>Add me to groups</label>
            <div className="option-buttons">
              {visibilityOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${settings.addToGroups === opt.id ? 'active' : ''}`}
                  onClick={() => handleSettingChange('addToGroups', opt.id)}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="privacy-option">
            <label>Allow calls from</label>
            <div className="option-buttons">
              {callOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`option-btn ${settings.allowCalls === opt.id ? 'active' : ''}`}
                  onClick={() => handleSettingChange('allowCalls', opt.id)}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>🔒 Security Settings</h3>
        
        <div className="security-option">
          <div className="security-label">
            <span className="security-icon">🔐</span>
            <div>
              <div className="security-title">Two-Factor Authentication</div>
              <div className="security-desc">Add an extra layer of security to your account</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="security-option">
          <div className="security-label">
            <span className="security-icon">👆</span>
            <div>
              <div className="security-title">Biometric Lock</div>
              <div className="security-desc">Use fingerprint or face ID to unlock the app</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.biometricLock}
              onChange={(e) => handleSettingChange('biometricLock', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="security-option">
          <div className="security-label">
            <span className="security-icon">👁️</span>
            <div>
              <div className="security-title">Read Receipts</div>
              <div className="security-desc">Show when you've read messages</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.readReceipts}
              onChange={(e) => handleSettingChange('readReceipts', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="security-option">
          <div className="security-label">
            <span className="security-icon">📤</span>
            <div>
              <div className="security-title">Forward Messages</div>
              <div className="security-desc">Allow others to forward your messages</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.forwardMessages}
              onChange={(e) => handleSettingChange('forwardMessages', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-card">
        <h3>💾 Data & Storage</h3>
        
        <div className="data-option">
          <div className="data-label">
            <span className="data-icon">🗑️</span>
            <div>
              <div className="data-title">Auto-delete messages</div>
              <div className="data-desc">Automatically delete old messages to save space</div>
            </div>
          </div>
          <div className="option-buttons">
            {autoDeleteOptions.map(opt => (
              <button
                key={opt.id}
                className={`option-btn ${settings.autoDeleteMessages === opt.id ? 'active' : ''}`}
                onClick={() => handleSettingChange('autoDeleteMessages', opt.id)}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="data-option">
          <div className="data-label">
            <span className="data-icon">☁️</span>
            <div>
              <div className="data-title">Save to Cloud</div>
              <div className="data-desc">Backup your chats and media automatically</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.saveToCloud}
              onChange={(e) => handleSettingChange('saveToCloud', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={() => alert('Privacy settings saved! 🔒')}>
          💾 Save Privacy Settings
        </button>
        <button className="review-btn" onClick={() => alert('Reviewing your privacy settings...')}>
          🔍 Review My Privacy
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;