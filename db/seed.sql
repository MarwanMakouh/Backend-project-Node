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
-- Originele films
('Inception', 2010, 'Sci-Fi', 'Christopher Nolan'),
('Titanic', 1997, 'Romance', 'James Cameron'),
('Interstellar', 2014, 'Sci-Fi', 'Christopher Nolan'),

-- Actie films
('The Dark Knight', 2008, 'Actie', 'Christopher Nolan'),
('Mad Max: Fury Road', 2015, 'Actie', 'George Miller'),
('John Wick', 2014, 'Actie', 'Chad Stahelski'),
('Die Hard', 1988, 'Actie', 'John McTiernan'),
('The Matrix', 1999, 'Sci-Fi/Actie', 'The Wachowskis'),

-- Drama films
('The Shawshank Redemption', 1994, 'Drama', 'Frank Darabont'),
('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis'),
('The Godfather', 1972, 'Drama/Misdaad', 'Francis Ford Coppola'),
('Schindler\'s List', 1993, 'Drama/Historisch', 'Steven Spielberg'),
('Fight Club', 1999, 'Drama', 'David Fincher'),

-- Comedy films
('Superbad', 2007, 'Comedy', 'Greg Mottola'),
('The Grand Budapest Hotel', 2014, 'Comedy/Drama', 'Wes Anderson'),
('Anchorman', 2004, 'Comedy', 'Adam McKay'),
('Groundhog Day', 1993, 'Comedy/Fantasy', 'Harold Ramis'),

-- Horror films
('The Shining', 1980, 'Horror', 'Stanley Kubrick'),
('Get Out', 2017, 'Horror/Thriller', 'Jordan Peele'),
('A Quiet Place', 2018, 'Horror/Sci-Fi', 'John Krasinski'),
('Hereditary', 2018, 'Horror', 'Ari Aster'),

-- Sci-Fi films
('Blade Runner 2049', 2017, 'Sci-Fi', 'Denis Villeneuve'),
('The Terminator', 1984, 'Sci-Fi/Actie', 'James Cameron'),
('Arrival', 2016, 'Sci-Fi/Drama', 'Denis Villeneuve'),
('Ex Machina', 2014, 'Sci-Fi/Thriller', 'Alex Garland'),

-- Animatie films
('Spirited Away', 2001, 'Animatie/Fantasy', 'Hayao Miyazaki'),
('Toy Story', 1995, 'Animatie/Avontuur', 'John Lasseter'),
('WALL-E', 2008, 'Animatie/Sci-Fi', 'Andrew Stanton'),
('The Lion King', 1994, 'Animatie/Drama', 'Roger Allers'),

-- Thriller films
('Se7en', 1995, 'Thriller/Misdaad', 'David Fincher'),
('Gone Girl', 2014, 'Thriller/Mystery', 'David Fincher'),
('Prisoners', 2013, 'Thriller/Drama', 'Denis Villeneuve'),
('Shutter Island', 2010, 'Thriller/Mystery', 'Martin Scorsese'),

-- Extra films zonder reviews (voor paginering)
('Pulp Fiction', 1994, 'Misdaad/Drama', 'Quentin Tarantino'),
('The Silence of the Lambs', 1991, 'Thriller/Horror', 'Jonathan Demme'),
('Goodfellas', 1990, 'Misdaad/Drama', 'Martin Scorsese'),
('The Departed', 2006, 'Misdaad/Thriller', 'Martin Scorsese'),
('The Prestige', 2006, 'Mystery/Thriller', 'Christopher Nolan'),
('Memento', 2000, 'Mystery/Thriller', 'Christopher Nolan'),
('Django Unchained', 2012, 'Western/Drama', 'Quentin Tarantino'),
('Inglourious Basterds', 2009, 'Oorlog/Drama', 'Quentin Tarantino'),
('The Wolf of Wall Street', 2013, 'Comedy/Drama', 'Martin Scorsese'),
('Catch Me If You Can', 2002, 'Drama/Misdaad', 'Steven Spielberg'),
('The Green Mile', 1999, 'Drama/Fantasy', 'Frank Darabont'),
('Gladiator', 2000, 'Actie/Drama', 'Ridley Scott'),
('The Pianist', 2002, 'Drama/Oorlog', 'Roman Polanski'),
('Saving Private Ryan', 1998, 'Oorlog/Drama', 'Steven Spielberg'),
('American Beauty', 1999, 'Drama', 'Sam Mendes'),
('No Country for Old Men', 2007, 'Thriller/Western', 'Coen Brothers'),
('There Will Be Blood', 2007, 'Drama', 'Paul Thomas Anderson'),
('Whiplash', 2014, 'Drama/Muziek', 'Damien Chazelle'),
('La La Land', 2016, 'Musical/Romance', 'Damien Chazelle'),
('Her', 2013, 'Sci-Fi/Romance', 'Spike Jonze'),
('Lost in Translation', 2003, 'Drama/Romance', 'Sofia Coppola'),
('Eternal Sunshine of the Spotless Mind', 2004, 'Romance/Sci-Fi', 'Michel Gondry'),
('The Truman Show', 1998, 'Comedy/Sci-Fi', 'Peter Weir'),
('Dead Poets Society', 1989, 'Drama', 'Peter Weir'),
('Good Will Hunting', 1997, 'Drama/Romance', 'Gus Van Sant'),
('A Beautiful Mind', 2001, 'Drama/Biography', 'Ron Howard'),
('The Social Network', 2010, 'Drama/Biography', 'David Fincher'),
('Steve Jobs', 2015, 'Drama/Biography', 'Danny Boyle'),
('The Imitation Game', 2014, 'Drama/Thriller', 'Morten Tyldum'),
('12 Years a Slave', 2013, 'Drama/Historisch', 'Steve McQueen'),
('Moonlight', 2016, 'Drama', 'Barry Jenkins'),
('Parasite', 2019, 'Thriller/Drama', 'Bong Joon-ho'),
('Oldboy', 2003, 'Thriller/Mystery', 'Park Chan-wook'),
('Spirited Away', 2001, 'Animatie/Fantasy', 'Hayao Miyazaki'),
('Your Name', 2016, 'Animatie/Romance', 'Makoto Shinkai'),
('Princess Mononoke', 1997, 'Animatie/Fantasy', 'Hayao Miyazaki'),
('Howl\'s Moving Castle', 2004, 'Animatie/Fantasy', 'Hayao Miyazaki'),
('Akira', 1988, 'Animatie/Sci-Fi', 'Katsuhiro Otomo'),
('Ghost in the Shell', 1995, 'Animatie/Sci-Fi', 'Mamoru Oshii'),
('Perfect Blue', 1997, 'Animatie/Thriller', 'Satoshi Kon'),
('Paprika', 2006, 'Animatie/Sci-Fi', 'Satoshi Kon');

INSERT INTO reviews (reviewer_name, rating, comment, movie_id)
VALUES
-- Originele reviews
('Alice', 5, 'Amazing movie!', 1),
('Bob', 4, 'Great visuals but a bit long.', 3),
('Charlie', 3, 'Nice but predictable.', 2),

-- Inception (id 1)
('Emma', 5, 'Mind-blowing! Nog nooit zo\'n origineel concept gezien.', 1),
('David', 5, 'Christopher Nolan op zijn best. Een absolute must-see!', 1),
('Sophie', 4, 'Geweldige film, maar je moet wel goed opletten.', 1),

-- Titanic (id 2)
('Lisa', 5, 'Een tijdloze klassieker. Huil elke keer weer.', 2),
('Mark', 3, 'Visueel prachtig, maar het verhaal is wat cliché.', 2),
('Anna', 4, 'Romantisch en dramatisch. Een geweldige film.', 2),

-- Interstellar (id 3)
('Tom', 5, 'Adembenemend! De beste sci-fi film ooit.', 3),
('Sarah', 5, 'Emotioneel en wetenschappelijk. Perfect!', 3),
('Mike', 4, 'Prachtige cinematografie en muziek.', 3),

-- The Dark Knight (id 4)
('Chris', 5, 'Heath Ledger\'s Joker is iconisch. Beste superhelden film ooit!', 4),
('Rachel', 5, 'Meesterwerk van Nolan. Donker en intens.', 4),
('James', 5, 'Perfecte balans tussen actie en verhaal.', 4),
('Nina', 4, 'Geweldig, maar soms wat lang.', 4),

-- Mad Max: Fury Road (id 5)
('Alex', 5, 'Non-stop actie! Een visueel spektakel.', 5),
('Julia', 4, 'Waanzinnige stunts en cinematografie.', 5),
('Peter', 5, 'De beste actiefilm van het decennium.', 5),

-- John Wick (id 6)
('Daniel', 4, 'Keanu Reeves is geweldig. Fantastische actie.', 6),
('Michelle', 5, 'Stijlvol en intens. Love it!', 6),
('Kevin', 4, 'Simpel verhaal maar geweldige uitvoering.', 6),

-- Die Hard (id 7)
('Robert', 5, 'De ultieme actie klassieker!', 7),
('Jessica', 5, 'Bruce Willis op zijn best. Tijdloos.', 7),
('Steven', 4, 'Yippee ki-yay! Altijd leuk om te zien.', 7),

-- The Matrix (id 8)
('Matthew', 5, 'Revolutionair voor zijn tijd. Iconisch!', 8),
('Laura', 5, 'Mind-bending sci-fi op zijn best.', 8),
('Brian', 4, 'Geweldig concept, maar de sequels zijn minder.', 8),
('Emily', 5, 'De special effects waren baanbrekend!', 8),

-- The Shawshank Redemption (id 9)
('Andrew', 5, 'Perfecte film. Niet voor niets #1 op IMDB.', 9),
('Olivia', 5, 'Ontroerend en hoopvol. Een meesterwerk.', 9),
('Ryan', 5, 'De beste film die ik ooit heb gezien.', 9),
('Grace', 5, 'Tijdloos verhaal over vriendschap en hoop.', 9),

-- Forrest Gump (id 10)
('William', 5, 'Tom Hanks\' beste rol. Zo emotioneel!', 10),
('Sophia', 5, 'Prachtig verhaal dat je raakt.', 10),
('Nathan', 4, 'Inspirerend en hartverwarmend.', 10),

-- The Godfather (id 11)
('Benjamin', 5, 'De ultieme maffia film. Absoluut meesterwerk.', 11),
('Chloe', 5, 'Brando\'s beste rol. Iconische film.', 11),
('Ethan', 5, 'Perfect op elk niveau.', 11),

-- Schindler\'s List (id 12)
('Mia', 5, 'Krachtig en ontroerend. Iedereen moet dit zien.', 12),
('Lucas', 5, 'Belangrijk verhaal, meesterlijk verteld.', 12),
('Ava', 5, 'Emotioneel zwaar maar essentieel.', 12),

-- Fight Club (id 13)
('Jackson', 5, 'Minds were blown. Geweldig plot twist!', 13),
('Isabella', 4, 'Controversieel maar briljant.', 13),
('Mason', 5, 'Cult klassieker met een boodschap.', 13),

-- Superbad (id 14)
('Liam', 4, 'Hilarisch! Beste comedy van de jaren 2000.', 14),
('Amelia', 4, 'Grappig en herkenbaar voor iedereen.', 14),
('Noah', 3, 'Leuk maar soms wat plat.', 14),

-- The Grand Budapest Hotel (id 15)
('Charlotte', 5, 'Visueel prachtig en charmant verhaal.', 15),
('Henry', 5, 'Wes Anderson op zijn best!', 15),
('Harper', 4, 'Unieke stijl en geweldige cast.', 15),

-- The Shining (id 16)
('Elijah', 5, 'Terrifying! Kubrick\'s meesterwerk.', 16),
('Abigail', 4, 'Eng maar traag. De sfeer is perfect.', 16),
('Carter', 5, 'Klassieke horror die nog steeds werkt.', 16),

-- Get Out (id 17)
('Luna', 5, 'Slimme horror met sociale commentaar.', 17),
('Sebastian', 5, 'Jordan Peele is een genie!', 17),
('Scarlett', 4, 'Spannend en origineel.', 17),

-- Blade Runner 2049 (id 20)
('Oliver', 5, 'Visueel adembenemend. Een kunstwerk.', 20),
('Aria', 4, 'Prachtige cinematografie maar traag tempo.', 20),
('Wyatt', 5, 'Betere sequel dan het origineel.', 20),

-- The Terminator (id 21)
('Jack', 5, 'Sci-fi klassieker. Schwarzenegger iconisch!', 21),
('Lily', 4, 'Nog steeds spannend na al die jaren.', 21),
('Aiden', 4, 'Simpel maar effectief verhaal.', 21),

-- Spirited Away (id 23)
('Zoe', 5, 'Magisch! Miyazaki\'s beste werk.', 23),
('Grayson', 5, 'Prachtige animatie en verhaal.', 23),
('Layla', 5, 'Een meesterwerk van Studio Ghibli.', 23),

-- Toy Story (id 24)
('Leo', 5, 'Revolutionaire animatie. Tijdloos!', 24),
('Nora', 5, 'Perfect voor jong en oud.', 24),
('Evan', 5, 'De film die alles veranderde voor animatie.', 24),

-- WALL-E (id 25)
('Stella', 5, 'Ontroerend zonder veel dialoog. Briljant!', 25),
('Xavier', 5, 'Pixar op zijn best. Emotioneel en mooi.', 25),
('Penelope', 4, 'Prachtig verhaal over liefde en milieu.', 25),

-- Se7en (id 27)
('Max', 5, 'Donkere thriller. Het einde is shockerend!', 27),
('Violet', 5, 'Fincher\'s beste. Intens en gruwelijk.', 27),
('Jaxon', 4, 'Zwaar maar meeslepend verhaal.', 27),

-- Gone Girl (id 28)
('Aurora', 5, 'Plot twist na plot twist. Geweldig!', 28),
('Hudson', 4, 'Rosamund Pike is fenomenaal.', 28),
('Hazel', 5, 'Kan niet stoppen met kijken!', 28),

-- Prisoners (id 29)
('Lincoln', 5, 'Intense thriller met geweldige prestaties.', 29),
('Savannah', 4, 'Zwaar maar meeslepend.', 29),
('Leo', 5, 'Jake Gyllenhaal en Hugh Jackman zijn perfect.', 29);
