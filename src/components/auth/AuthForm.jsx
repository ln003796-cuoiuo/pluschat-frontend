import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import './AuthForm.css';

export default function AuthForm({ onAuthSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const ADMIN_EMAIL = 'lysakov.kolyan@yandex.ru';

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Проверка на админ-почту при регистрации
    if (isRegistering && email === ADMIN_EMAIL) {
      setError('Этот email зарезервирован для администратора');
      setLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        // Регистрация
        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Если это не админ-почта, создаем профиль
        if (email !== ADMIN_EMAIL) {
          await supabase.from('profiles').insert([
            { email, full_name: email.split('@')[0] }
          ]);
        }
      } else {
        // Вход
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      }

      // Успех
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return Math.min(5, strength);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{isRegistering ? 'Регистрация' : 'Вход'}</h1>
          <p className="auth-subtitle">
            {isRegistering 
              ? 'Создайте аккаунт для доступа к мессенджеру' 
              : 'Войдите в свой аккаунт'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              className="form-input"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="form-input"
              required
              disabled={loading}
            />
            
            {isRegistering && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: 
                        passwordStrength === 0 ? '#FF4444' :
                        passwordStrength < 3 ? '#FFAA00' : '#00FF88'
                    }}
                  ></div>
                </div>
                <div className="strength-text">
                  {passwordStrength === 0 && 'Слабый'}
                  {passwordStrength > 0 && passwordStrength < 3 && 'Средний'}
                  {passwordStrength >= 3 && 'Сильный'}
                </div>
              </div>
            )}
          </div>

          {isRegistering && (
            <div className="form-group">
              <label className="form-label">Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
                disabled={loading}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
          >
            {loading ? 'Обработка...' : isRegistering ? 'Зарегистрироваться' : 'Войти'}
          </button>

          <div className="auth-footer">
            <button 
              type="button" 
              className="switch-link"
              onClick={() => setIsRegistering(!isRegistering)}
              disabled={loading}
            >
              {isRegistering 
                ? 'Уже есть аккаунт? Войти' 
                : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          </div>
        </form>

        {/* Скрыть кнопку Google */}
        <div className="auth-divider">
          <span>Или</span>
        </div>

        <div className="auth-methods">
          {/* Удалите или закомментируйте эту секцию */}
          {/* <button className="auth-method">Войти через Google</button> */}
        </div>
      </div>
    </div>
  );
}