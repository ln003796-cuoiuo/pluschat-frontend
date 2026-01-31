import React, { useState } from 'react';
import './Modal.css';

const JoinGroupModal = ({ onClose }) => {
  const [groupId, setGroupId] = useState('');
  const [searching, setSearching] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null);

  const mockGroups = {
    'dev-team-123': {
      id: 'dev-team-123',
      name: 'Dev Team Alpha',
      members: 24,
      type: 'Private',
      createdAt: '3 days ago'
    },
    'crypto-chat-456': {
      id: 'crypto-chat-456',
      name: 'Crypto Enthusiasts',
      members: 156,
      type: 'Private',
      createdAt: '2 weeks ago'
    },
    'secret-project-789': {
      id: 'secret-project-789',
      name: 'Project Phoenix',
      members: 8,
      type: 'Secret',
      createdAt: '1 day ago'
    }
  };

  const handleSearch = () => {
    if (!groupId.trim()) return;
    
    setSearching(true);
    setTimeout(() => {
      const group = mockGroups[groupId.trim().toLowerCase()];
      setGroupInfo(group);
      setSearching(false);
    }, 800);
  };

  const handleJoin = (role) => {
    alert(`✅ Successfully joined "${groupInfo.name}" as ${role}!\n\nGroup ID: ${groupInfo.id}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content join-group-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">👑</div>
          <h2>Join Private Group</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            As a developer, you can join any private group without an invitation link.
          </p>

          <div className="search-section">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Enter Group ID..."
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input"
              />
              <button 
                className="search-btn"
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? '🔍 Searching...' : '🔍 Search'}
              </button>
            </div>

            <div className="search-hint">
              💡 Tip: Group IDs are usually found in invite links or shared by admins
            </div>
          </div>

          {groupInfo && (
            <div className="group-preview">
              <div className="group-header">
                <div className="group-icon">👥</div>
                <div className="group-details">
                  <h3>{groupInfo.name}</h3>
                  <div className="group-meta">
                    <span>{groupInfo.members} members</span>
                    <span>•</span>
                    <span>{groupInfo.type} group</span>
                    <span>•</span>
                    <span>Created {groupInfo.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="group-actions">
                <button className="join-btn admin" onClick={() => handleJoin('Admin')}>
                  👑 Join as Admin
                </button>
                <button className="join-btn member" onClick={() => handleJoin('Member')}>
                  👤 Join as Member
                </button>
              </div>
            </div>
          )}

          {groupId && !groupInfo && !searching && (
            <div className="no-results">
              <div className="no-results-icon">❌</div>
              <p>Group not found. Please check the ID and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;