import React, { useState } from 'react';
import './ProfileSettings.css';

const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || 'Kolyan Lysakov',
    username: user?.user_metadata?.username || '@kolyan',
    bio: user?.user_metadata?.bio || 'Crypto dev • Privacy advocate',
    email: user?.email || 'lysakov.kolyan@yandex.ru',
    phone: '+7 (978) ***-**-30',
    status: 'Online'
  });

  const [avatar, setAvatar] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    alert('Profile saved successfully! 👑');
  };

  return (
    <div className="profile-settings">
      <div className="settings-card">
        <h3>🖼️ Avatar</h3>
        <div className="avatar-section">
          <div className="avatar-preview" style={{ backgroundImage: avatar ? `url(${avatar})` : 'none' }}>
            {!avatar && 'K'}
          </div>
          <div className="avatar-controls">
            <label className="avatar-btn upload">
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              📎 Change Avatar
            </label>
            {avatar && (
              <button className="avatar-btn remove" onClick={() => setAvatar(null)}>
                🗑️ Remove
              </button>
            )}
            <p className="avatar-hint">
              {avatar ? 'Live avatar (video) supported for Premium users' : 'Upload photo or video (up to 15s)'}
            </p>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>📝 Personal Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="settings-input"
          />
        </div>
        
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="settings-input"
          />
          <p className="form-hint">People can find you by this username</p>
        </div>
        
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="settings-textarea"
            rows="3"
          />
          <p className="form-hint">Tell people about yourself (max 120 characters)</p>
        </div>
      </div>

      <div className="settings-card">
        <h3>📧 Contact Information</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="settings-input"
            disabled
          />
          <p className="form-hint">Primary email for account access</p>
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="settings-input"
          />
          <p className="form-hint">Used for two-factor authentication</p>
        </div>
      </div>

      <div className="settings-card">
        <h3>💬 Status</h3>
        <div className="status-options">
          <label className="status-option">
            <input
              type="radio"
              name="status"
              value="Online"
              checked={formData.status === 'Online'}
              onChange={handleInputChange}
            />
            <span className="status-label">
              <span className="status-dot online"></span>
              Online
            </span>
          </label>
          
          <label className="status-option">
            <input
              type="radio"
              name="status"
              value="Away"
              checked={formData.status === 'Away'}
              onChange={handleInputChange}
            />
            <span className="status-label">
              <span className="status-dot away"></span>
              Away
            </span>
          </label>
          
          <label className="status-option">
            <input
              type="radio"
              name="status"
              value="Do Not Disturb"
              checked={formData.status === 'Do Not Disturb'}
              onChange={handleInputChange}
            />
            <span className="status-label">
              <span className="status-dot dnd"></span>
              Do Not Disturb
            </span>
          </label>
          
          <label className="status-option">
            <input
              type="radio"
              name="status"
              value="Invisible"
              checked={formData.status === 'Invisible'}
              onChange={handleInputChange}
            />
            <span className="status-label">
              <span className="status-dot invisible"></span>
              Invisible
            </span>
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSave}>
          💾 Save Changes
        </button>
        <button className="cancel-btn">
          ❌ Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;