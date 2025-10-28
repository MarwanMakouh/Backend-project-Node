import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants/index.js";

export const validateMovie = (title, year, genre, director) => {
  const errors = [];

  // Check required fields
  if (!title || !year || !genre || !director) {
    errors.push(ERROR_MESSAGES.MOVIE_FIELDS_REQUIRED);
    return { isValid: false, errors };
  }

  // Validate title
  if (title.trim() === "") {
    errors.push(ERROR_MESSAGES.TITLE_EMPTY);
  }

  // Validate year
  if (isNaN(year) || year < VALIDATION_RULES.MOVIE_YEAR.MIN || year > VALIDATION_RULES.MOVIE_YEAR.MAX) {
    errors.push(ERROR_MESSAGES.INVALID_YEAR);
  }

  // Validate genre
  if (genre.trim() === "") {
    errors.push(ERROR_MESSAGES.GENRE_EMPTY);
  }

  // Validate director
  if (director.trim() === "") {
    errors.push(ERROR_MESSAGES.DIRECTOR_EMPTY);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePagination = (limit, offset) => {
  const errors = [];

  if (limit < 1 || limit > VALIDATION_RULES.PAGINATION?.MAX_LIMIT || 100) {
    errors.push(ERROR_MESSAGES.INVALID_LIMIT);
  }

  if (offset < 0) {
    errors.push(ERROR_MESSAGES.INVALID_OFFSET);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSearchParams = (title, genre, director, year) => {
  const errors = [];

  // At least one parameter is required
  if (!title && !genre && !director && !year) {
    errors.push(ERROR_MESSAGES.SEARCH_PARAM_REQUIRED);
  }

  // Validate year if provided
  if (year && isNaN(parseInt(year))) {
    errors.push(ERROR_MESSAGES.YEAR_INVALID_NUMBER);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
