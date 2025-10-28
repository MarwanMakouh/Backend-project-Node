import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants/index.js";

export const validateReview = (reviewer_name, rating, movie_id) => {
  const errors = [];

  // Check required fields
  if (!reviewer_name || !rating || !movie_id) {
    errors.push(ERROR_MESSAGES.REVIEW_FIELDS_REQUIRED);
    return { isValid: false, errors };
  }

  // Validate reviewer_name
  if (reviewer_name.trim() === "") {
    errors.push(ERROR_MESSAGES.REVIEWER_NAME_EMPTY);
  }

  // Validate rating
  if (isNaN(rating) || rating < VALIDATION_RULES.RATING.MIN || rating > VALIDATION_RULES.RATING.MAX) {
    errors.push(ERROR_MESSAGES.INVALID_RATING);
  }

  // Validate movie_id
  if (isNaN(movie_id)) {
    errors.push(ERROR_MESSAGES.INVALID_MOVIE_ID);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
