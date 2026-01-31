import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DeveloperPanel from './components/layout/DeveloperPanel';
import ChatList from './components/chat/ChatList';
import MessageInput from './components/chat/MessageInput';
import Settings from './components/settings/Settings';
import JoinGroupModal from './components/modals/JoinGroupModal';
import BroadcastModal from './components/modals/BroadcastModal';
import AuthForm from './components/auth/AuthForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('chats');
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверка сессии при запуске
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Session error:', error);
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkSession();
    
    // Слушатель изменений сессии
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
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

  // Если пользователь не авторизован, показываем форму аутентификации
  if (!user) {
    return (
      <div className="auth-container">
        <AuthForm onAuthSuccess={setUser} />
      </div>
    );
  }

  // Если пользователь авторизован, показываем мессенджер
  const developerMode = user?.email === 'lysakov.kolyan@yandex.ru';

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

export default App;