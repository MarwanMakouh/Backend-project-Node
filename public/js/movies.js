// Movies Management JavaScript
//const API_BASE = '/api';

// Global variables
let currentMovieId = null;
let allMovies = [];
let allReviews = [];

// Helper functions
function getToken() {
  return localStorage.getItem('authToken');
}

function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
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
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load all movies and reviews
async function loadMovies() {
  const container = document.getElementById('movies-container');
  const moviesList = document.getElementById('movies-list');

  try {
    // Load movies
    const moviesResponse = await fetch(`${API_BASE}/movies`);
    if (!moviesResponse.ok) throw new Error('Fout bij laden films');
    const moviesData = await moviesResponse.json();
    allMovies = moviesData.data || moviesData;

    // Load reviews
    const reviewsResponse = await fetch(`${API_BASE}/reviews`);
    if (!reviewsResponse.ok) throw new Error('Fout bij laden reviews');
    allReviews = await reviewsResponse.json();

    container.style.display = 'none';
    moviesList.style.display = 'grid';

    displayMovies(allMovies);
  } catch (error) {
    container.style.display = 'none';
    showMessage('Fout bij laden van films: ' + error.message, 'error');
  }
}

// Display movies
function displayMovies(movies) {
  const moviesList = document.getElementById('movies-list');

  if (!movies || movies.length === 0) {
    moviesList.innerHTML = '<p class="no-results">Geen films gevonden.</p>';
    return;
  }

  const isUserAdmin = isAdmin();

  moviesList.innerHTML = movies.map(movie => {
    // Get reviews for this movie
    const movieReviews = allReviews.filter(review => review.movie_id === movie.id);
    const avgRating = movieReviews.length > 0
      ? (movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length).toFixed(1)
      : null;

    return `
      <div class="movie-card" style="cursor: pointer;" onclick="window.location.href='/movies/${movie.id}'">
        <div class="movie-header">
          <h3>${escapeHtml(movie.title || 'Onbekende titel')}</h3>
          ${avgRating ? `<div class="movie-avg-rating">⭐ ${avgRating}/5</div>` : ''}
        </div>
        <div class="movie-details">
          ${movie.year ? `<p><strong>📅 Jaar:</strong> ${escapeHtml(String(movie.year))}</p>` : ''}
          ${movie.genre ? `<p><strong>🎭 Genre:</strong> ${escapeHtml(movie.genre)}</p>` : ''}
          ${movie.director ? `<p><strong>🎬 Regisseur:</strong> ${escapeHtml(movie.director)}</p>` : ''}
        </div>

        ${movieReviews.length > 0 ? `
          <div class="movie-reviews-section">
            <h4>📝 Reviews (${movieReviews.length})</h4>
            <div class="movie-reviews-list">
              ${movieReviews.map(review => `
                <div class="movie-review-item">
                  <div class="review-item-header">
                    <span class="review-item-author">${escapeHtml(review.reviewer_name)}</span>
                    <span class="review-item-rating">${'⭐'.repeat(review.rating)}</span>
                  </div>
                  ${review.comment ? `<p class="review-item-comment">${escapeHtml(review.comment)}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : '<p class="no-reviews">Nog geen reviews voor deze film</p>'}

        ${isUserAdmin ? `
          <div class="movie-actions">
            <button class="btn btn-small btn-edit" onclick="event.stopPropagation(); editMovie(${movie.id})">✏️ Bewerken</button>
            <button class="btn btn-small btn-danger" onclick="event.stopPropagation(); openDeleteModal(${movie.id}, '${escapeHtml(movie.title).replace(/'/g, "\\'")}')">🗑️ Verwijderen</button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Search movies
async function searchMovies(e) {
  e.preventDefault();

  const title = document.getElementById('search-title').value.trim();
  const genre = document.getElementById('search-genre').value.trim();
  const director = document.getElementById('search-director').value.trim();
  const year = document.getElementById('search-year').value.trim();

  // Build query string
  const params = new URLSearchParams();
  if (title) params.append('title', title);
  if (genre) params.append('genre', genre);
  if (director) params.append('director', director);
  if (year) params.append('year', year);

  if (params.toString() === '') {
    loadMovies();
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/movies/search?${params.toString()}`);
    if (!response.ok) throw new Error('Fout bij zoeken');

    const data = await response.json();
    const movies = data.results || data;

    displayMovies(movies);
    showMessage(`${movies.length} film(s) gevonden`, 'success');
  } catch (error) {
    showMessage('Fout bij zoeken: ' + error.message, 'error');
  }
}

// Clear search
function clearSearch() {
  document.getElementById('search-title').value = '';
  document.getElementById('search-genre').value = '';
  document.getElementById('search-director').value = '';
  document.getElementById('search-year').value = '';
  loadMovies();
}

// Open add movie modal
function openAddMovieModal() {
  document.getElementById('modal-title').textContent = 'Film Toevoegen';
  document.getElementById('movie-id').value = '';
  document.getElementById('movie-title').value = '';
  document.getElementById('movie-year').value = '';
  document.getElementById('movie-genre').value = '';
  document.getElementById('movie-director').value = '';
  document.getElementById('movie-modal').style.display = 'flex';
}

// Edit movie
async function editMovie(id) {
  try {
    const response = await fetch(`${API_BASE}/movies/${id}`);
    if (!response.ok) throw new Error('Film niet gevonden');

    const movie = await response.json();

    document.getElementById('modal-title').textContent = 'Film Bewerken';
    document.getElementById('movie-id').value = movie.id;
    document.getElementById('movie-title').value = movie.title;
    document.getElementById('movie-year').value = movie.year;
    document.getElementById('movie-genre').value = movie.genre;
    document.getElementById('movie-director').value = movie.director;
    document.getElementById('movie-modal').style.display = 'flex';
  } catch (error) {
    showMessage('Fout bij laden film: ' + error.message, 'error');
  }
}

// Close movie modal
function closeMovieModal() {
  document.getElementById('movie-modal').style.display = 'none';
}

// Save movie (add or update)
async function saveMovie(e) {
  e.preventDefault();

  const id = document.getElementById('movie-id').value;
  const title = document.getElementById('movie-title').value.trim();
  const year = parseInt(document.getElementById('movie-year').value);
  const genre = document.getElementById('movie-genre').value.trim();
  const director = document.getElementById('movie-director').value.trim();

  const movieData = { title, year, genre, director };
  const token = getToken();

  if (!token) {
    showMessage('Je moet ingelogd zijn als admin', 'error');
    return;
  }

  try {
    const url = id ? `${API_BASE}/movies/${id}` : `${API_BASE}/movies`;
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
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

    showMessage(id ? 'Film bijgewerkt!' : 'Film toegevoegd!', 'success');
    closeMovieModal();
    loadMovies();
  } catch (error) {
    showMessage('Fout bij opslaan: ' + error.message, 'error');
  }
}

// Open delete confirmation modal
function openDeleteModal(id, title) {
  currentMovieId = id;
  document.getElementById('delete-movie-title').textContent = title;
  document.getElementById('delete-modal').style.display = 'flex';
}

// Close delete modal
function closeDeleteModal() {
  currentMovieId = null;
  document.getElementById('delete-modal').style.display = 'none';
}

// Delete movie
async function deleteMovie() {
  if (!currentMovieId) return;

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
    loadMovies();
  } catch (error) {
    showMessage('Fout bij verwijderen: ' + error.message, 'error');
    closeDeleteModal();
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on movies page
  if (!window.location.pathname.includes('/movies')) return;

  // Show admin actions if user is admin
  if (isAdmin()) {
    document.getElementById('admin-actions').style.display = 'block';
  }

  // Load movies
  loadMovies();

  // Event listeners
  document.getElementById('search-form').addEventListener('submit', searchMovies);
  document.getElementById('clear-search').addEventListener('click', clearSearch);
  document.getElementById('movie-form').addEventListener('submit', saveMovie);
  document.getElementById('confirm-delete').addEventListener('click', deleteMovie);

  // Add movie button (if exists)
  const addBtn = document.getElementById('add-movie-btn');
  if (addBtn) {
    addBtn.addEventListener('click', openAddMovieModal);
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
