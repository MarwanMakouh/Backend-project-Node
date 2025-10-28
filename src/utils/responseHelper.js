import { HTTP_STATUS } from "../constants/index.js";

/**
 * Send success response
 */
export const sendSuccess = (res, data, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json(data);
};

/**
 * Send error response
 */
export const sendError = (res, message, statusCode = HTTP_STATUS.BAD_REQUEST) => {
  return res.status(statusCode).json({ error: message });
};

/**
 * Send validation error response
 */
export const sendValidationError = (res, errors) => {
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    error: "Validation failed",
    details: errors
  });
};

/**
 * Send not found error
 */
export const sendNotFound = (res, message) => {
  return res.status(HTTP_STATUS.NOT_FOUND).json({ error: message });
};

/**
 * Send unauthorized error
 */
export const sendUnauthorized = (res, message) => {
  return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: message });
};

/**
 * Send forbidden error
 */
export const sendForbidden = (res, message) => {
  return res.status(HTTP_STATUS.FORBIDDEN).json({ error: message });
};

/**
 * Send server error
 */
export const sendServerError = (res, message) => {
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: message });
};
