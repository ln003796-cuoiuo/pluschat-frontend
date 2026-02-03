
// ========== ИНИЦИАЛИЗАЦИЯ SUPABASE ==========
const supabaseUrl = 'https://pfwevfihobzbecgrayqr.supabase.co';
const supabaseAnonKey = 'sb_publishable_Hvs4wm7b46wg2KTc5S9vQg_9Do_TpbV';
const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ========== ЭЛЕМЕНТЫ ИНТЕРФЕЙСА ==========
const authScreen = document.getElementById('auth-screen');
const profileScreen = document.getElementById('profile-screen');
const errorDiv = document.getElementById('error');
const googleBtn = document.getElementById('google-btn');
const logoutBtn = document.getElementById('logout-btn');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const avatarEl = document.getElementById('avatar');
const statusEl = document.getElementById('status');

// ========== ФУНКЦИЯ ВХОДА ЧЕРЕЗ GOOGLE ==========
async function signInWithGoogle() {
  try {
    errorDiv.style.display = 'none';
    googleBtn.disabled = true;
    googleBtn.innerHTML = '<span>Перенаправление...</span>';
    
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://ln003796-cuoiuo-plus-qy4y.bolt.host/auth/callback',
        scopes: 'openid email profile'
      }
    });
    
    if (error) throw error;
    
  } catch (error) {
    showError('Ошибка входа через Google: ' + error.message);
    googleBtn.disabled = false;
    googleBtn.innerHTML = `
      <div class="google-icon">
        <svg viewBox="0 0 48 48" width="24" height="24">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.17l3.53-3.53C32.4 5.88 28.4 4 24 4 15.16 4 8 11.16 8 20c0 8.84 7.16 16 16 16 1.93 0 3.79-.35 5.51-1.04l-1.43-1.43c-1.13.59-2.43.92-3.83.92-3.54 0-6.71-1.22-9.21-3.17l-3.53 3.53C9.5 32.4 13.4 34.28 17.84 34.28c4.4 0 8-3.54 8-8 0-1.89-.69-3.6-1.83-4.98l-1.43 1.43c.83 1.14 1.29 2.5 1.29 3.98 0 3.54-2.87 6.41-6.41 6.41-1.8 0-3.4-.74-4.6-1.93l-3.53 3.53c1.96 1.95 4.6 3.17 7.6 3.17 5.3 0 9.6-4.3 9.6-9.6 0-5.3-4.3-9.6-9.6-9.6-5.3 0-9.6 4.3-9.6 9.6 0 5.3 4.3 9.6 9.6 9.6 3.4 0 6.4-1.7 8.17-4.27l-1.43-1.43C22.3 23.4 21.5 21.9 21.5 20.3c0-1.3.2-2.4.6-3.4l-1.43-1.43C19.4 15.3 18.2 14.3 16.9 14.3c-3.54 0-6.71 1.22-9.21 3.17l-3.53-3.53C6.7 10.5 11.7 8 17.3 8 20.9 8 24 9.5 24 9.5z"/>
        </svg>
      </div>
      <span class="google-text">Войти через Google</span>
    `;
  }
}

// ========== ФУНКЦИЯ ВЫХОДА ==========
async function signOut() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    
    profileScreen.style.display = 'none';
    authScreen.style.display = 'flex';
  } catch (error) {
    showError('Ошибка выхода: ' + error.message);
  }
}

// ========== ПОКАЗ ОШИБКИ ==========
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// ========== ПРОВЕРКА СЕССИИ ==========
async function checkSession() {
  const {  { session }, error } = await supabaseClient.auth.getSession();
  
  if (error) {
    console.error('Session error:', error);
    return;
  }
  
  if (session?.user) {
    showProfile(session.user);
  } else {
    if (window.location.pathname === '/auth/callback') {
      setTimeout(async () => {
        const {  { session: newSession } } = await supabaseClient.auth.getSession();
        if (newSession?.user) {
          window.history.replaceState({}, document.title, '/');
          showProfile(newSession.user);
        } else {
          authScreen.style.display = 'flex';
        }
      }, 2000);
    } else {
      authScreen.style.display = 'flex';
    }
  }
}

// ========== ОТОБРАЖЕНИЕ ПРОФИЛЯ ==========
function showProfile(user) {
  authScreen.style.display = 'none';
  profileScreen.style.display = 'flex';
  
  const name = user.user_metadata?.full_name || user.email.split('@')[0];
  const firstLetter = name.charAt(0).toUpperCase();
  
  nameEl.textContent = name;
  emailEl.textContent = user.email;
  avatarEl.textContent = firstLetter;
  
  if (user.email === 'lysakov.kolyan@yandex.ru') {
    avatarEl.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.9)';
    avatarEl.style.border = '4px solid #FFD700';
    statusEl.innerHTML = '👑 Developer Mode';
    statusEl.style.color = '#FFD700';
  }
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
if (googleBtn) {
  googleBtn.addEventListener('click', signInWithGoogle);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', signOut);
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', checkSession);