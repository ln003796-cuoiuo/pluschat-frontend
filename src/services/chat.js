// Chat service - handles all chat-related operations

export const chatService = {
  // Get all chats for a user
  async getChats(userId) {
    // In a real app, this would fetch from Supabase/Firebase
    console.log('Fetching chats for user:', userId);
    return mockChats;
  },

  // Get messages for a specific chat
  async getMessages(chatId, limit = 50) {
    console.log('Fetching messages for chat:', chatId);
    return mockMessages.filter(msg => msg.chatId === chatId).slice(-limit);
  },

  // Send a new message
  async sendMessage(chatId, content, senderId) {
    const message = {
      id: Date.now().toString(),
      chatId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    console.log('Sending message:', message);
    // In real app: await supabase.from('messages').insert(message)
    
    return message;
  },

  // Mark message as read
  async markAsRead(messageId) {
    console.log('Marking message as read:', messageId);
    // await supabase.from('messages').update({ status: 'read' }).eq('id', messageId)
  },

  // Create a new chat
  async createChat(participants) {
    const chat = {
      id: Date.now().toString(),
      participants,
      createdAt: new Date().toISOString(),
      type: participants.length > 2 ? 'group' : 'private'
    };
    
    console.log('Creating chat:', chat);
    return chat;
  },

  // Join a group
  async joinGroup(groupId, userId, role = 'member') {
    console.log(`User ${userId} joining group ${groupId} as ${role}`);
    // await supabase.from('group_members').insert({ group_id: groupId, user_id: userId, role })
    return { success: true, groupId, userId, role };
  },

  // Send broadcast message
  async sendBroadcast(message, options = {}) {
    const broadcast = {
      id: Date.now().toString(),
      content: message,
      priority: options.priority || 'normal',
      audience: options.audience || 'all',
      requiresConfirmation: options.requiresConfirmation || false,
      timestamp: new Date().toISOString(),
      sentBy: 'developer'
    };
    
    console.log('Sending broadcast:', broadcast);
    return broadcast;
  },

  // Search chats/messages
  async search(query, userId) {
    console.log('Searching for:', query);
    const results = {
      chats: mockChats.filter(chat => 
        chat.name.toLowerCase().includes(query.toLowerCase())
      ),
      messages: mockMessages.filter(msg => 
        msg.content.toLowerCase().includes(query.toLowerCase())
      )
    };
    return results;
  }
};

// Mock data for development
const mockChats = [
  { id: '1', name: 'John Doe', type: 'private', lastMessage: 'Hey, how are you?', unread: 3 },
  { id: '2', name: 'Dev Team', type: 'group', lastMessage: '@Kolyan check this!', unread: 1 },
  { id: '3', name: 'Sarah Johnson', type: 'private', lastMessage: 'Can we call?', unread: 0 },
  { id: '4', name: 'PlusChat News', type: 'channel', lastMessage: 'New update!', unread: 0 }
];

const mockMessages = [
  { id: '1', chatId: '1', senderId: 'user2', content: 'Hey Kolyan!', timestamp: '2026-01-31T10:00:00Z' },
  { id: '2', chatId: '1', senderId: 'user1', content: 'Hi there!', timestamp: '2026-01-31T10:01:00Z' },
  { id: '3', chatId: '2', senderId: 'user3', content: '@Kolyan check this new feature!', timestamp: '2026-01-31T11:00:00Z' },
  { id: '4', chatId: '1', senderId: 'user2', content: 'How are you?', timestamp: '2026-01-31T11:05:00Z' }
];