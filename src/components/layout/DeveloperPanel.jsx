import React from 'react';
import './DeveloperPanel.css';

const DeveloperPanel = ({ onClose, onJoinGroup, onBroadcast, onAnalytics }) => {
  return (
    <div className="developer-panel-overlay" onClick={onClose}>
      <div className="developer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <div className="panel-title">
            <span className="panel-icon">👑</span>
            <h2>DEVELOPER CONSOLE</h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="panel-content">
          <section className="panel-section">
            <h3 className="section-label">⚡ QUICK ACTIONS</h3>
            <div className="action-grid">
              <button className="action-card" onClick={onJoinGroup}>
                <div className="action-icon">🚪</div>
                <div className="action-title">Join Private Group</div>
                <div className="action-desc">Enter any group without invite</div>
              </button>
              
              <button className="action-card" onClick={onBroadcast}>
                <div className="action-icon">📢</div>
                <div className="action-title">Send Broadcast</div>
                <div className="action-desc">Message all users</div>
              </button>
              
              <button className="action-card" onClick={onAnalytics}>
                <div className="action-icon">📊</div>
                <div className="action-title">System Analytics</div>
                <div className="action-desc">View platform metrics</div>
              </button>
              
              <button className="action-card">
                <div className="action-icon">🔧</div>
                <div className="action-title">API Access</div>
                <div className="action-desc">Manage API tokens</div>
              </button>
            </div>
          </section>

          <section className="panel-section">
            <h3 className="section-label">📈 SYSTEM METRICS</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">1,247</div>
                <div className="metric-label">Active Users</div>
                <div className="metric-trend positive">↑ 12% today</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">8,432</div>
                <div className="metric-label">Messages/min</div>
                <div className="metric-trend positive">↑ 8% today</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">34%</div>
                <div className="metric-label">Server Load</div>
                <div className="metric-trend">Stable</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">14d 7h</div>
                <div className="metric-label">Uptime</div>
                <div className="metric-trend positive">Optimal</div>
              </div>
            </div>
          </section>

          <section className="panel-section">
            <h3 className="section-label">👥 ACTIVE SESSIONS</h3>
            <div className="sessions-list">
              <div className="session-item">
                <div className="session-icon">📱</div>
                <div className="session-info">
                  <div className="session-name">iPhone 15 Pro</div>
                  <div className="session-location">Moscow • Today, 14:23</div>
                </div>
                <button className="session-btn">Terminate</button>
              </div>
              
              <div className="session-item">
                <div className="session-icon">💻</div>
                <div className="session-info">
                  <div className="session-name">MacBook Pro</div>
                  <div className="session-location">Crimea • Today, 10:17</div>
                </div>
                <button className="session-btn">Terminate</button>
              </div>
              
              <div className="session-item">
                <div className="session-icon">🌐</div>
                <div className="session-info">
                  <div className="session-name">Chrome (Web)</div>
                  <div className="session-location">Active • 2 min ago</div>
                </div>
                <button className="session-btn">Terminate</button>
              </div>
            </div>
          </section>

          <section className="panel-section">
            <h3 className="section-label">⚙️ SERVER STATUS</h3>
            <div className="status-grid">
              <div className="status-item">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <div className="status-name">Database</div>
                  <div className="status-detail">PostgreSQL • Healthy</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <div className="status-name">Cache</div>
                  <div className="status-detail">Redis • Operational</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <div className="status-name">AI Gateway</div>
                  <div className="status-detail">Online • 42ms latency</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <div className="status-name">CDN</div>
                  <div className="status-detail">Optimal • 98% hit rate</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="panel-footer">
          <div className="developer-info">
            <div className="dev-avatar">K</div>
            <div className="dev-details">
              <div className="dev-name">Kolyan Lysakov</div>
              <div className="dev-email">lysakov.kolyan@yandex.ru</div>
            </div>
          </div>
          <button className="panel-close-btn" onClick={onClose}>
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPanel;