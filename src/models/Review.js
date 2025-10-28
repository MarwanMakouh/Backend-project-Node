/**
 * Review Model Schema
 * Represents a review in the system
 */
export class Review {
  constructor({ id, reviewer_name, rating, comment, movie_id, created_at }) {
    this.id = id;
    this.reviewer_name = reviewer_name;
    this.rating = rating;
    this.comment = comment;
    this.movie_id = movie_id;
    this.created_at = created_at;
  }

  /**
   * Convert review object to JSON
   */
  toJSON() {
    return {
      id: this.id,
      reviewer_name: this.reviewer_name,
      rating: this.rating,
      comment: this.comment,
      movie_id: this.movie_id,
      created_at: this.created_at
    };
  }
}
