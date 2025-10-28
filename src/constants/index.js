// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// User Roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin"
};

// JWT Configuration
export const JWT_CONFIG = {
  EXPIRES_IN: "24h",
  SECRET: process.env.JWT_SECRET || "your-secret-key"
};

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100
  },
  MOVIE_YEAR: {
    MIN: 1888,
    MAX: 2100
  },
  RATING: {
    MIN: 1,
    MAX: 5
  }
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0
};

// Error Messages
export const ERROR_MESSAGES = {
  // Auth errors
  USERNAME_PASSWORD_REQUIRED: "Username and password are required",
  INVALID_CREDENTIALS: "Invalid username or password",
  USERNAME_EMAIL_PASSWORD_REQUIRED: "Username, email, and password are required",
  USERNAME_TOO_SHORT: "Username must be at least 3 characters long",
  USERNAME_NO_SPACES: "Username cannot contain spaces",
  INVALID_EMAIL: "Invalid email format",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long",
  USERNAME_EXISTS: "Username already exists",
  EMAIL_EXISTS: "Email already exists",
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid or expired token",
  USER_NOT_FOUND: "User not found",
  FORBIDDEN: "Access denied",

  // Movie errors
  MOVIE_FIELDS_REQUIRED: "Required fields: title, year, genre, director",
  TITLE_EMPTY: "Title cannot be empty",
  INVALID_YEAR: "Year must be a number between 1888 and 2100",
  GENRE_EMPTY: "Genre cannot be empty",
  DIRECTOR_EMPTY: "Director cannot be empty",
  MOVIE_NOT_FOUND: "Movie not found",
  INVALID_LIMIT: "Limit must be between 1 and 100",
  INVALID_OFFSET: "Offset must be 0 or greater",
  SEARCH_PARAM_REQUIRED: "At least one search parameter is required (title, genre, director, or year)",
  YEAR_INVALID_NUMBER: "Year must be a valid number",

  // Review errors
  REVIEW_FIELDS_REQUIRED: "Required fields: reviewer_name, rating, movie_id",
  REVIEWER_NAME_EMPTY: "Reviewer name cannot be empty",
  INVALID_RATING: "Rating must be a number between 1 and 5",
  INVALID_MOVIE_ID: "Movie ID must be a number",
  REVIEW_NOT_FOUND: "Review not found",
  MOVIE_NOT_FOUND_FOR_REVIEW: "Movie not found. Cannot create review for non-existent movie.",
  MOVIE_NOT_FOUND_FOR_UPDATE: "Movie not found. Cannot update review with non-existent movie."
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  MOVIE_CREATED: "Movie created successfully",
  MOVIE_UPDATED: "Movie updated successfully",
  MOVIE_DELETED: "Movie deleted successfully",
  REVIEW_CREATED: "Review created successfully",
  REVIEW_UPDATED: "Review updated successfully",
  REVIEW_DELETED: "Review deleted successfully"
};
