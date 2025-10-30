// Reviews Management JavaScript
//const API_BASE = '/api';

// Global variables
let currentReviewId = null;
let allMovies = [];

// Helper functions
function getToken() {
  return localStorage.getItem('authToken');
}

function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function showMessage(message, type = 'success') {
  const successDiv = document.getElementById('success-message');
  const errorDiv = document.getElementById('error-message');

  if (type === 'success') {
    errorDiv.style.display = 'none';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => successDiv.style.display = 'none', 5000);
  } else {
    successDiv.style.display = 'none';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load movies for dropdown
async function loadMoviesDropdown() {
  try {
    const response = await fetch(`${API_BASE}/movies`);
    if (!response.ok) throw new Error('Fout bij laden films');

    const data = await response.json();
    allMovies = data.data || data;

    const select = document.getElementById('review-movie');
    select.innerHTML = '<option value="">-- Selecteer een film --</option>' +
      allMovies.map(movie => `
        <option value="${movie.id}">${escapeHtml(movie.title)} (${movie.year})</option>
      `).join('');
  } catch (error) {
    showMessage('Fout bij laden films: ' + error.message, 'error');
  }
}

// Load all reviews
async function loadReviews() {
  const container = document.getElementById('reviews-container');
  const reviewsList = document.getElementById('reviews-list');

  try {
    const response = await fetch(`${API_BASE}/reviews`);
    if (!response.ok) throw new Error('Fout bij laden reviews');

    const reviews = await response.json();

    container.style.display = 'none';
    reviewsList.style.display = 'block';

    displayReviews(reviews);
  } catch (error) {
    container.style.display = 'none';
    showMessage('Fout bij laden reviews: ' + error.message, 'error');
  }
}

// Display reviews (same style as movies)
function displayReviews(reviews) {
  const reviewsList = document.getElementById('reviews-list');

  if (!reviews || reviews.length === 0) {
    reviewsList.innerHTML = '<p class="no-results">Nog geen reviews gevonden. Wees de eerste om een review te plaatsen!</p>';
    return;
  }

  const isUserAdmin = isAdmin();

  reviewsList.innerHTML = reviews.map(review => {
    const stars = '⭐'.repeat(review.rating || 0);

    return `
      <div class="movie-card review-full-card" style="cursor: pointer;" onclick="window.location.href='/movies/${review.movie_id}'">
        <div class="movie-header">
          <div>
            <h3>${escapeHtml(review.movie_title || 'Onbekende film')}</h3>
            <p class="reviewer">door ${escapeHtml(review.reviewer_name || 'Anoniem')}</p>
          </div>
          <div class="movie-avg-rating">
            ${stars} ${review.rating}/5
          </div>
        </div>
        ${review.comment ? `
          <div class="movie-details">
            <p><strong>💬 Review:</strong></p>
            <p class="review-comment-text">${escapeHtml(review.comment)}</p>
          </div>
        ` : '<p class="no-comment">Geen commentaar</p>'}
        ${isUserAdmin ? `
          <div class="movie-actions">
            <button class="btn btn-small btn-danger" onclick="event.stopPropagation(); openDeleteReviewModal(${review.id})">
              🗑️ Verwijderen
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Update star display based on rating input
function updateStarDisplay() {
  const ratingInput = document.getElementById('review-rating');
  const starDisplay = document.getElementById('star-display');

  ratingInput.addEventListener('input', () => {
    const value = parseInt(ratingInput.value) || 1;
    const clampedValue = Math.max(1, Math.min(5, value));
    ratingInput.value = clampedValue;
    starDisplay.textContent = '⭐'.repeat(clampedValue);
  });
}

// Add review
async function addReview(e) {
  e.preventDefault();

  const movieId = document.getElementById('review-movie').value;
  const reviewerName = document.getElementById('review-name').value.trim();
  const rating = parseInt(document.getElementById('review-rating').value);
  const comment = document.getElementById('review-comment').value.trim();

  if (!movieId) {
    showMessage('Selecteer een film', 'error');
    return;
  }

  const token = getToken();
  if (!token) {
    showMessage('Je moet ingelogd zijn om een review te plaatsen', 'error');
    return;
  }

  const reviewData = {
    movie_id: parseInt(movieId),
    reviewer_name: reviewerName,
    rating: rating,
    comment: comment || undefined
  };

  try {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Fout bij plaatsen review');
    }

    showMessage('Review succesvol geplaatst!', 'success');

    // Reset form
    document.getElementById('add-review-form').reset();
    document.getElementById('star-display').textContent = '⭐⭐⭐⭐⭐';

    // Reload reviews
    loadReviews();

  } catch (error) {
    showMessage('Fout bij plaatsen review: ' + error.message, 'error');
  }
}

// Open delete review modal
function openDeleteReviewModal(id) {
  currentReviewId = id;
  document.getElementById('delete-review-modal').style.display = 'flex';
}

// Close delete review modal
function closeDeleteReviewModal() {
  currentReviewId = null;
  document.getElementById('delete-review-modal').style.display = 'none';
}

// Delete review
async function deleteReview() {
  if (!currentReviewId) return;

  const token = getToken();
  if (!token) {
    showMessage('Je moet ingelogd zijn als admin', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/reviews/${currentReviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Fout bij verwijderen');
    }

    showMessage('Review verwijderd!', 'success');
    closeDeleteReviewModal();
    loadReviews();

  } catch (error) {
    showMessage('Fout bij verwijderen: ' + error.message, 'error');
    closeDeleteReviewModal();
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on reviews page
  if (!window.location.pathname.includes('/reviews')) return;

  // Check authentication and show appropriate section
  if (isLoggedIn()) {
    document.getElementById('add-review-section').style.display = 'block';
    document.getElementById('login-prompt').style.display = 'none';

    // Load movies for dropdown
    loadMoviesDropdown();

    // Setup star display update
    updateStarDisplay();

    // Add review form submit
    document.getElementById('add-review-form').addEventListener('submit', addReview);
  } else {
    document.getElementById('add-review-section').style.display = 'none';
    document.getElementById('login-prompt').style.display = 'block';
  }

  // Load reviews
  loadReviews();

  // Delete review button
  const confirmDeleteBtn = document.getElementById('confirm-delete-review');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', deleteReview);
  }

  // Click outside modal to close
  window.addEventListener('click', (e) => {
    const deleteModal = document.getElementById('delete-review-modal');
    if (e.target === deleteModal) {
      closeDeleteReviewModal();
    }
  });
});
