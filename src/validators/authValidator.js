import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants/index.js";

export const validateLogin = (username, password) => {
  const errors = [];

  if (!username || !password) {
    errors.push(ERROR_MESSAGES.USERNAME_PASSWORD_REQUIRED);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRegister = (username, email, password) => {
  const errors = [];

  if (!username || !email || !password) {
    errors.push(ERROR_MESSAGES.USERNAME_EMAIL_PASSWORD_REQUIRED);
    return { isValid: false, errors };
  }

  // Validate username
  if (username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.USERNAME_TOO_SHORT);
  }

  if (username.includes(" ")) {
    errors.push(ERROR_MESSAGES.USERNAME_NO_SPACES);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  // Validate password
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
