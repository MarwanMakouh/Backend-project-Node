-- Insert users (passwords are bcrypt hashed)
-- admin: admin123
-- user: user123
INSERT INTO users (username, email, password, role)
VALUES
('admin', 'admin@filmreview.com', '$2b$10$83f7lX8Tz2LO4Xxo3TThp.apfnUhHW9zh.VlDDmH54GDmCZhHX.E2', 'admin'),
('user', 'user@filmreview.com', '$2b$10$Y6FVbJyNvb2CArIpkygqH.bqF27eutszRyAPxiq8KkIWma2WY9d/y', 'user'),
('john_doe', 'john@example.com', '$2b$10$Y6FVbJyNvb2CArIpkygqH.bqF27eutszRyAPxiq8KkIWma2WY9d/y', 'user');

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
