/**
 * Movie Model Schema
 * Represents a movie in the system
 */
export class Movie {
  constructor({ id, title, year, genre, director, created_at }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.director = director;
    this.created_at = created_at;
  }

  /**
   * Convert movie object to JSON
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      year: this.year,
      genre: this.genre,
      director: this.director,
      created_at: this.created_at
    };
  }
}
