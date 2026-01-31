import React, { useState } from 'react';
import './ChatList.css';

const mockChats = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'J',
    lastMessage: 'Hey, how are you?',
    time: '2 min ago',
    unread: 3,
    type: 'private'
  },
  {
    id: 2,
    name: 'Dev Team',
    avatar: '👥',
    lastMessage: '@Kolyan check this new feature!',
    time: '5 min ago',
    unread: 1,
    type: 'group'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    avatar: 'S',
    lastMessage: 'Can we schedule a call?',
    time: '15 min ago',
    unread: 0,
    type: 'private'
  },
  {
    id: 4,
    name: 'PlusChat News',
    avatar: '📢',
    lastMessage: 'New update v2.0 released!',
    time: '1 hour ago',
    unread: 0,
    type: 'channel'
  },
  {
    id: 5,
    name: 'Alex Smith',
    avatar: 'A',
    lastMessage: 'Thanks for the help!',
    time: '3 hours ago',
    unread: 0,
    type: 'private'
  },
  {
    id: 6,
    name: 'Crypto Group',
    avatar: '💎',
    lastMessage: 'Bitcoin just hit $100k!',
    time: 'Yesterday',
    unread: 12,
    type: 'group'
  },
  {
    id: 7,
    name: 'Mom',
    avatar: 'M',
    lastMessage: 'When are you coming home?',
    time: '2 days ago',
    unread: 0,
    type: 'private'
  },
  {
    id: 8,
    name: 'Project Alpha',
    avatar: '🚀',
    lastMessage: 'Deadline extended to Friday',
    time: '3 days ago',
    unread: 0,
    type: 'group'
  }
];

const ChatList = ({ user, onSelectChat }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredChats = mockChats.filter(chat => {
    if (filter === 'all') return true;
    if (filter === 'unread') return chat.unread > 0;
    return chat.type === filter;
  });

  const handleChatClick = (chat) => {
    setSelectedChat(chat.id);
    if (onSelectChat) onSelectChat(chat);
  };

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Chats</h2>
        <div className="chats-count">{mockChats.length}</div>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread <span className="unread-count">{mockChats.filter(c => c.unread > 0).length}</span>
        </button>
        <button
          className={`filter-tab ${filter === 'private' ? 'active' : ''}`}
          onClick={() => setFilter('private')}
        >
          Private
        </button>
        <button
          className={`filter-tab ${filter === 'group' ? 'active' : ''}`}
          onClick={() => setFilter('group')}
        >
          Groups
        </button>
      </div>

      <div className="chat-list">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
            onClick={() => handleChatClick(chat)}
          >
            <div className="chat-avatar">
              {chat.avatar}
              {chat.type === 'online' && <div className="online-indicator"></div>}
            </div>
            
            <div className="chat-info">
              <div className="chat-header">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-time">{chat.time}</div>
              </div>
              
              <div className="chat-preview">
                {chat.lastMessage}
              </div>
            </div>
            
            {chat.unread > 0 && (
              <div className="unread-badge">{chat.unread}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;