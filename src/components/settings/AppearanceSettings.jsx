import React, { useState } from 'react';
import './AppearanceSettings.css';

const AppearanceSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'cyberpunk',
    bubbles: 'glassmorphism',
    animations: 'full',
    accentColor: 'cyan',
    fontSize: 'medium',
    messageTimestamps: true,
    readReceipts: true,
    typingIndicators: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    console.log(`Setting changed: ${key} = ${value}`);
  };

  const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk (Dark)', preview: '🌑' },
    { id: 'light', name: 'Light Mode', preview: '🌕' },
    { id: 'system', name: 'System Default', preview: '🖥️' }
  ];

  const bubbleStyles = [
    { id: 'glassmorphism', name: 'Glassmorphism', preview: '🪟' },
    { id: 'flat', name: 'Flat Design', preview: '⬜' },
    { id: 'rounded', name: 'Rounded', preview: '⬤' }
  ];

  const animationLevels = [
    { id: 'full', name: 'Full (120 FPS)', preview: '⚡' },
    { id: 'reduced', name: 'Reduced', preview: '🐢' },
    { id: 'disabled', name: 'Disabled', preview: '🛑' }
  ];

  const accentColors = [
    { id: 'cyan', name: 'Neon Cyan', color: '#00F3FF' },
    { id: 'purple', name: 'Purple', color: '#B72EFF' },
    { id: 'green', name: 'Matrix Green', color: '#00FF88' },
    { id: 'gold', name: 'Royal Gold', color: '#FFD700', premium: true }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small (14px)' },
    { id: 'medium', name: 'Medium (16px)' },
    { id: 'large', name: 'Large (18px)' },
    { id: 'xlarge', name: 'Extra Large (20px)' }
  ];

  return (
    <div className="appearance-settings">
      <div className="settings-card">
        <h3>🎨 Theme</h3>
        <div className="theme-grid">
          {themes.map(theme => (
            <button
              key={theme.id}
              className={`theme-option ${settings.theme === theme.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('theme', theme.id)}
            >
              <div className="theme-preview">{theme.preview}</div>
              <div className="theme-name">{theme.name}</div>
              {settings.theme === theme.id && (
                <div className="theme-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3>💬 Message Bubbles</h3>
        <div className="bubble-grid">
          {bubbleStyles.map(style => (
            <button
              key={style.id}
              className={`bubble-option ${settings.bubbles === style.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('bubbles', style.id)}
            >
              <div className="bubble-preview">
                <div className={`bubble-sample ${style.id}`}>Hi!</div>
              </div>
              <div className="bubble-name">{style.name}</div>
              {settings.bubbles === style.id && (
                <div className="bubble-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3>⚡ Animations</h3>
        <div className="animation-grid">
          {animationLevels.map(level => (
            <button
              key={level.id}
              className={`animation-option ${settings.animations === level.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('animations', level.id)}
            >
              <div className="animation-icon">{level.preview}</div>
              <div className="animation-name">{level.name}</div>
              {settings.animations === level.id && (
                <div className="animation-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3>🌈 Accent Color</h3>
        <div className="color-grid">
          {accentColors.map(color => (
            <button
              key={color.id}
              className={`color-option ${settings.accentColor === color.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('accentColor', color.id)}
              disabled={color.premium}
            >
              <div 
                className="color-preview" 
                style={{ backgroundColor: color.color }}
              ></div>
              <div className="color-name">{color.name}</div>
              {color.premium && (
                <div className="premium-badge">⭐</div>
              )}
              {settings.accentColor === color.id && (
                <div className="color-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3>🔠 Font Size</h3>
        <div className="font-grid">
          {fontSizes.map(size => (
            <button
              key={size.id}
              className={`font-option ${settings.fontSize === size.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('fontSize', size.id)}
            >
              <div className="font-preview">
                Aa
              </div>
              <div className="font-name">{size.name}</div>
              {settings.fontSize === size.id && (
                <div className="font-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-card">
        <h3>⚙️ Interface Preferences</h3>
        <div className="toggle-group">
          <div className="toggle-item">
            <span className="toggle-label">Show message timestamps</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.messageTimestamps}
                onChange={(e) => handleSettingChange('messageTimestamps', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <span className="toggle-label">Show read receipts</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.readReceipts}
                onChange={(e) => handleSettingChange('readReceipts', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <span className="toggle-label">Show typing indicators</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.typingIndicators}
                onChange={(e) => handleSettingChange('typingIndicators', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={() => alert('Appearance settings saved! 🎨')}>
          💾 Apply Changes
        </button>
        <button className="reset-btn" onClick={() => {
          if (window.confirm('Reset all appearance settings to default?')) {
            setSettings({
              theme: 'cyberpunk',
              bubbles: 'glassmorphism',
              animations: 'full',
              accentColor: 'cyan',
              fontSize: 'medium',
              messageTimestamps: true,
              readReceipts: true,
              typingIndicators: true
            });
            alert('Settings reset to default! ✨');
          }
        }}>
          🔄 Reset to Default
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;