// Movie Detail Page JavaScript

// Global variables
let currentMovieId = null;
let currentMovie = null;
let movieReviews = [];

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

// Get movie ID from URL
function getMovieIdFromUrl() {
  const path = window.location.pathname;
  const matches = path.match(/\/movies\/(\d+)/);
  return matches ? parseInt(matches[1]) : null;
}

// Load movie details
async function loadMovieDetails() {
  const movieId = getMovieIdFromUrl();

  if (!movieId) {
    showMessage('Ongeldige film ID', 'error');
    setTimeout(() => window.location.href = '/movies', 2000);
    return;
  }

  currentMovieId = movieId;

  try {
    const response = await fetch(`${API_BASE}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error('Film niet gevonden');
    }

    currentMovie = await response.json();
    displayMovieDetails(currentMovie);

    // Load reviews for this movie
    await loadMovieReviews();

  } catch (error) {
    document.getElementById('movie-loading').style.display = 'none';
    showMessage('Fout bij laden film: ' + error.message, 'error');
    setTimeout(() => window.location.href = '/movies', 2000);
  }
}

// Display movie details
function displayMovieDetails(movie) {
  document.getElementById('movie-loading').style.display = 'none';
  document.getElementById('movie-details').style.display = 'block';

  // Update page header
  document.getElementById('movie-title-header').textContent = movie.title;

  // Update movie details
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-year').textContent = movie.year;
  document.getElementById('movie-genre').textContent = movie.genre;
  document.getElementById('movie-director').textContent = movie.director;

  // Show admin actions if user is admin
  if (isAdmin()) {
    document.getElementById('admin-actions').style.display = 'flex';
  }
}

// Load reviews for this movie
async function loadMovieReviews() {
  const reviewsLoading = document.getElementById('reviews-loading');
  const reviewsList = document.getElementById('reviews-list');
  const noReviews = document.getElementById('no-reviews');

  try {
    // Get all reviews and filter for this movie (gebruik hoge limit om alle reviews te krijgen)
    const response = await fetch(`${API_BASE}/reviews?limit=1000`);
    if (!response.ok) throw new Error('Fout bij laden reviews');

    const reviewsData = await response.json();
    const allReviews = reviewsData.data || reviewsData;
    movieReviews = allReviews.filter(review => review.movie_id === currentMovieId);

    reviewsLoading.style.display = 'none';

    if (movieReviews.length === 0) {
      reviewsList.style.display = 'none';
      noReviews.style.display = 'block';
      document.getElementById('movie-rating').textContent = 'Nog geen reviews';
    } else {
      displayReviews(movieReviews);
      reviewsList.style.display = 'block';
      noReviews.style.display = 'none';

      // Calculate and display average rating
      const avgRating = (movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length).toFixed(1);
      document.getElementById('movie-rating').textContent = `${avgRating}/5 (${movieReviews.length} reviews)`;
    }

  } catch (error) {
    reviewsLoading.style.display = 'none';
    showMessage('Fout bij laden reviews: ' + error.message, 'error');
  }
}

// Display reviews
function displayReviews(reviews) {
  const reviewsList = document.getElementById('reviews-list');
  const isUserAdmin = isAdmin();

  reviewsList.innerHTML = reviews.map(review => {
    const stars = '⭐'.repeat(review.rating || 0);

    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-author">
            <strong>${escapeHtml(review.reviewer_name || 'Anoniem')}</strong>
          </div>
          <div class="review-rating">
            ${stars} ${review.rating}/5
          </div>
        </div>
        ${review.comment ? `
          <div class="review-comment">
            <p>${escapeHtml(review.comment)}</p>
          </div>
        ` : ''}
        ${isUserAdmin ? `
          <div class="review-actions">
            <button class="btn btn-small btn-danger" onclick="deleteReview(${review.id})">
              🗑️ Verwijderen
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Add review
async function addReview(e) {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    showMessage('Je moet ingelogd zijn om een review te plaatsen', 'error');
    return;
  }

  const user = getUser();
  const rating = parseInt(document.getElementById('review-rating').value);
  const comment = document.getElementById('review-comment').value.trim();

  const reviewData = {
    movie_id: currentMovieId,
    reviewer_name: user.username,
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

    // Reload reviews
    await loadMovieReviews();

  } catch (error) {
    showMessage('Fout bij plaatsen review: ' + error.message, 'error');
  }
}

// Delete review
async function deleteReview(reviewId) {
  if (!confirm('Weet je zeker dat je deze review wilt verwijderen?')) {
    return;
  }

  const token = getToken();
  if (!token) {
    showMessage('Je moet ingelogd zijn als admin', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/reviews/${reviewId}`, {
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
    await loadMovieReviews();

  } catch (error) {
    showMessage('Fout bij verwijderen: ' + error.message, 'error');
  }
}

// Edit movie
function editMovie() {
  if (!currentMovie) return;

  document.getElementById('movie-id').value = currentMovie.id;
  document.getElementById('edit-movie-title').value = currentMovie.title;
  document.getElementById('edit-movie-year').value = currentMovie.year;
  document.getElementById('edit-movie-genre').value = currentMovie.genre;
  document.getElementById('edit-movie-director').value = currentMovie.director;
  document.getElementById('movie-modal').style.display = 'flex';
}

// Close movie modal
function closeMovieModal() {
  document.getElementById('movie-modal').style.display = 'none';
}

// Save movie (update)
async function saveMovie(e) {
  e.preventDefault();

  const id = document.getElementById('movie-id').value;
  const title = document.getElementById('edit-movie-title').value.trim();
  const year = parseInt(document.getElementById('edit-movie-year').value);
  const genre = document.getElementById('edit-movie-genre').value.trim();
  const director = document.getElementById('edit-movie-director').value.trim();

  const movieData = { title, year, genre, director };
  const token = getToken();

  if (!token) {
    showMessage('Je moet ingelogd zijn als admin', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movieData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Fout bij opslaan');
    }

    showMessage('Film bijgewerkt!', 'success');
    closeMovieModal();

    // Reload movie details
    await loadMovieDetails();

  } catch (error) {
    showMessage('Fout bij opslaan: ' + error.message, 'error');
  }
}

// Open delete modal
function openDeleteModal() {
  if (!currentMovie) return;

  document.getElementById('delete-movie-title').textContent = currentMovie.title;
  document.getElementById('delete-modal').style.display = 'flex';
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
}

// Delete movie
async function deleteMovie() {
  const token = getToken();
  if (!token) {
    showMessage('Je moet ingelogd zijn als admin', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/movies/${currentMovieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Fout bij verwijderen');
    }

    showMessage('Film verwijderd!', 'success');
    closeDeleteModal();

    // Redirect to movies page after deletion
    setTimeout(() => window.location.href = '/movies', 1500);

  } catch (error) {
    showMessage('Fout bij verwijderen: ' + error.message, 'error');
    closeDeleteModal();
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on movie detail page
  if (!window.location.pathname.match(/\/movies\/\d+/)) return;

  // Load movie details
  loadMovieDetails();

  // Check authentication and show appropriate section
  if (isLoggedIn()) {
    document.getElementById('add-review-section').style.display = 'block';
    document.getElementById('login-prompt').style.display = 'none';

    // Add review form submit
    document.getElementById('add-review-form').addEventListener('submit', addReview);
  } else {
    document.getElementById('add-review-section').style.display = 'none';
    document.getElementById('login-prompt').style.display = 'block';
  }

  // Admin actions
  const editBtn = document.getElementById('edit-movie-btn');
  const deleteBtn = document.getElementById('delete-movie-btn');

  if (editBtn) {
    editBtn.addEventListener('click', editMovie);
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', openDeleteModal);
  }

  // Movie form submit
  const movieForm = document.getElementById('movie-form');
  if (movieForm) {
    movieForm.addEventListener('submit', saveMovie);
  }

  // Delete confirmation
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', deleteMovie);
  }

  // Modal close button
  const closeBtn = document.querySelector('#movie-modal .close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMovieModal);
  }

  // Click outside modal to close
  window.addEventListener('click', (e) => {
    const movieModal = document.getElementById('movie-modal');
    const deleteModal = document.getElementById('delete-modal');

    if (e.target === movieModal) {
      closeMovieModal();
    }
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
  });
});
