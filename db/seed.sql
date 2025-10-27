INSERT INTO movies (title, year, genre, director)
VALUES
('Inception', 2010, 'Sci-Fi', 'Christopher Nolan'),
('Titanic', 1997, 'Romance', 'James Cameron'),
('Interstellar', 2014, 'Sci-Fi', 'Christopher Nolan');

INSERT INTO reviews (reviewer_name, rating, comment, movie_id)
VALUES
('Alice', 5, 'Amazing movie!', 1),
('Bob', 4, 'Great visuals but a bit long.', 3),
('Charlie', 3, 'Nice but predictable.', 2);
