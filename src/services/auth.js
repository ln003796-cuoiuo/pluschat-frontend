// Проверка статуса разработчика
export const isDeveloper = (user) => {
  return user?.email === 'lysakov.kolyan@yandex.ru';
};

// Проверка премиум-статуса
export const isPremium = (user) => {
  return isDeveloper(user); // Пока только разработчик = премиум
};

// Выход из системы
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Logout error:', error);
};