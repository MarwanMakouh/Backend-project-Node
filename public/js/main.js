// Global utility functions
// Note: movies.js and reviews.js handle their respective pages

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// This file is now only for shared utilities
// Page-specific logic is in movies.js and reviews.js
