// API Base URL
const API_BASE = '/api';

// Utility function to fetch data
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Load movies
async function loadMovies() {
  const container = document.getElementById('movies-container');
  const moviesList = document.getElementById('movies-list');
  const errorMessage = document.getElementById('error-message');

  try {
    const movies = await fetchData('/movies');

    container.style.display = 'none';
    moviesList.style.display = 'grid';

    if (movies.length === 0) {
      moviesList.innerHTML = '<p class="loading">Geen films gevonden.</p>';
      return;
    }

    moviesList.innerHTML = movies.map(movie => `
      <div class="card movie-card">
        <h3>${escapeHtml(movie.title || 'Onbekende titel')}</h3>
        <div class="movie-meta">
          ${movie.release_year ? `<span>📅 ${escapeHtml(movie.release_year)}</span>` : ''}
          ${movie.genre ? `<span>🎭 ${escapeHtml(movie.genre)}</span>` : ''}
          ${movie.director ? `<span>🎬 ${escapeHtml(movie.director)}</span>` : ''}
        </div>
        ${movie.description ? `<p class="movie-description">${escapeHtml(movie.description)}</p>` : ''}
      </div>
    `).join('');
  } catch (error) {
    container.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Er is een fout opgetreden bij het laden van de films. Controleer of de database verbinding werkt.';
  }
}

// Load reviews
async function loadReviews() {
  const container = document.getElementById('reviews-container');
  const reviewsList = document.getElementById('reviews-list');
  const errorMessage = document.getElementById('error-message');

  try {
    const reviews = await fetchData('/reviews');

    container.style.display = 'none';
    reviewsList.style.display = 'flex';

    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p class="loading">Geen reviews gevonden.</p>';
      return;
    }

    reviewsList.innerHTML = reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <h3>${escapeHtml(review.movie_title || 'Onbekende film')}</h3>
          ${review.rating ? `
            <div class="review-rating">
              <span>⭐</span>
              <span>${escapeHtml(review.rating)}/10</span>
            </div>
          ` : ''}
        </div>
        ${review.review_text ? `<p class="review-text">${escapeHtml(review.review_text)}</p>` : ''}
        ${review.reviewer_name ? `<p style="color: #999; margin-top: 1rem;">- ${escapeHtml(review.reviewer_name)}</p>` : ''}
      </div>
    `).join('');
  } catch (error) {
    container.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Er is een fout opgetreden bij het laden van de reviews. Controleer of de database verbinding werkt.';
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path === '/movies') {
    loadMovies();
  } else if (path === '/reviews') {
    loadReviews();
  }
});
