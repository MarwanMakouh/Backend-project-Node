// Auth utilities
const API_BASE = '/api';

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');

  successDiv.style.display = 'none';
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// Show success message
function showSuccess(message) {
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');

  errorDiv.style.display = 'none';
  successDiv.textContent = message;
  successDiv.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

// Save token to localStorage
function saveToken(token) {
  localStorage.setItem('authToken', token);
}

// Get token from localStorage
function getToken() {
  return localStorage.getItem('authToken');
}

// Remove token from localStorage
function removeToken() {
  localStorage.removeItem('authToken');
}

// Save user info to localStorage
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Get user info from localStorage
function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Check if user is admin
function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

// Logout
function logout() {
  removeToken();
  localStorage.removeItem('user');
  window.location.href = '/login';
}

// Handle Login Form
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      // Validation
      if (!username || !password) {
        showError('Vul alle velden in');
        return;
      }

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Bezig met inloggen...';

      try {
        const response = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login mislukt');
        }

        // Save token and user info
        saveToken(data.token);
        saveUser(data.user);

        showSuccess('Login succesvol! Doorverwijzen...');

        // Redirect after 1 second
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);

      } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Inloggen';
      }
    });
  }

  // Handle Register Form
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      // Validation
      if (!username || !email || !password || !confirmPassword) {
        showError('Vul alle velden in');
        return;
      }

      if (username.length < 3) {
        showError('Gebruikersnaam moet minimaal 3 tekens zijn');
        return;
      }

      if (username.includes(' ')) {
        showError('Gebruikersnaam mag geen spaties bevatten');
        return;
      }

      if (password.length < 6) {
        showError('Wachtwoord moet minimaal 6 tekens zijn');
        return;
      }

      if (password !== confirmPassword) {
        showError('Wachtwoorden komen niet overeen');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Ongeldig email adres');
        return;
      }

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Bezig met registreren...';

      try {
        const response = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Registratie mislukt');
        }

        // Save token and user info
        saveToken(data.token);
        saveUser(data.user);

        showSuccess('Registratie succesvol! Doorverwijzen...');

        // Redirect after 1 second
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);

      } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Registreren';
      }
    });
  }
});

// Export functions for use in other scripts
window.authUtils = {
  getToken,
  getUser,
  isLoggedIn,
  isAdmin,
  logout,
  saveToken,
  saveUser
};
