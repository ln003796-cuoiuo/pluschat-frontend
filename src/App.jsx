import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DeveloperPanel from './components/layout/DeveloperPanel';
import ChatList from './components/chat/ChatList';
import MessageInput from './components/chat/MessageInput';
import Settings from './components/settings/Settings';
import JoinGroupModal from './components/modals/JoinGroupModal';
import BroadcastModal from './components/modals/BroadcastModal';
import { supabase } from './services/supabase';
import { isDeveloper } from './services/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('chats');
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // Проверка аутентификации
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    checkUser();
    
    // Слушатель изменений сессии
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        color: '#00F3FF',
        fontSize: '24px'
      }}>
        Загрузка...
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const developerMode = isDeveloper(user);

  return (
    <Router>
      <div className="app-container">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          developerMode={developerMode}
          user={user}
        />
        
        <div className="main-area">
          <Header 
            user={user} 
            developerMode={developerMode}
            onDeveloperPanelToggle={() => setShowDeveloperPanel(!showDeveloperPanel)}
          />
          
          <div className="content-area">
            <Routes>
              <Route path="/chats" element={
                <div className="chat-section">
                  <ChatList user={user} />
                  <MessageInput />
                </div>
              } />
              
              <Route path="/settings" element={<Settings user={user} />} />
              
              <Route path="/" element={<Navigate to="/chats" replace />} />
            </Routes>
          </div>
        </div>

        {showDeveloperPanel && developerMode && (
          <DeveloperPanel 
            onClose={() => setShowDeveloperPanel(false)}
            onJoinGroup={() => setShowJoinGroupModal(true)}
            onBroadcast={() => setShowBroadcastModal(true)}
          />
        )}

        {showJoinGroupModal && (
          <JoinGroupModal 
            onClose={() => setShowJoinGroupModal(false)} 
          />
        )}

        {showBroadcastModal && (
          <BroadcastModal 
            onClose={() => setShowBroadcastModal(false)} 
          />
        )}
      </div>
    </Router>
  );
}

// Экран входа
function LoginScreen() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    
    if (error) console.error('Error:', error);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="logo">
          <span style={{ fontSize: '48px', background: 'linear-gradient(90deg, #00F3FF, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            💬
          </span>
          <h1>PlusChat</h1>
        </div>
        
        <p className="tagline">Киберпанк-мессенджер с абсолютной приватностью</p>
        
        <button className="login-btn" onClick={handleLogin}>
          <span>🔐</span>
          Войти через Google
        </button>

        <div className="demo-mode">
          <p>Для демонстрации используйте тестовый аккаунт:</p>
          <button className="demo-btn" onClick={() => window.location.reload()}>
            Режим разработчика (lysakov.kolyan@yandex.ru)
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;