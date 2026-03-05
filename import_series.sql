-- 1. Aggiorna la tabella per il tracking
ALTER TABLE serie_tv
ADD COLUMN stagione_corrente INT DEFAULT 1,
ADD COLUMN episodio_corrente INT DEFAULT 1,
ADD COLUMN episodi_totali INT DEFAULT 0,
ADD COLUMN totale_stagioni INT DEFAULT 1;

-- 2. Inserimento Dati (Bulk Import)
-- Tipo: 0 = Serie TV / Western Animation, 1 = Anime (Giapponese)

INSERT INTO serie_tv (titolo, tipo, stagioni) VALUES
-- Serie TV / Western
('The Boys', 0, 4),
('Invincible', 0, 2),
('The Legend of Vox Machina', 0, 3),
('Hazbin Hotel', 0, 1),
('Daredevil', 0, 3),
('Jessica Jones', 0, 3),
('Luke Cage', 0, 2),
('Iron Fist', 0, 2),
('The Defenders', 0, 1),
('The Punisher', 0, 2),
('Hawkeye', 0, 1),
('Echo', 0, 1),
('Daredevil: Born Again', 0, 1),

-- Anime
('Shimoneta', 1, 1),
('No Game No Life', 1, 1),
('Hunter x Hunter', 1, 1),
('Dr. Stone', 1, 3), -- Stone Wars etc merged
('Fullmetal Alchemist: Brotherhood', 1, 1),
('Tokyo Ghoul', 1, 2), -- Merged root A
('Prison School', 1, 1),
('Steins;Gate', 1, 2), -- Merged 0
('Bleach', 1, 16),
('One Punch Man', 1, 3),
('Parasyte: The Maxim', 1, 1),
('Demon Slayer', 1, 4),
('Death Note', 1, 1),
('Death Parade', 1, 1),
('My Hero Academia', 1, 7),
('Baki', 1, 4),
('Black Lagoon', 1, 2),
('The Seven Deadly Sins', 1, 5),
('Overlord', 1, 4),
('Assassination Classroom', 1, 2),
('The God of High School', 1, 1),
('Hinomaru Sumo', 1, 1),
('Plunderer', 1, 1),
('Tokyo Revengers', 1, 3),
('Code Geass', 1, 2),
('Jujutsu Kaisen', 1, 2),
('Black Clover', 1, 1),
('Mob Psycho 100', 1, 3),
('Fire Force', 1, 2),
('The Misfit of Demon King Academy', 1, 2),
('The Promised Neverland', 1, 2),
('Devilman Crybaby', 1, 1),
('The World''s Finest Assassin Gets Reincarnated in Another World as an Aristocrat', 1, 1),
('Seraph of the End', 1, 2),
('Dan Da Dan', 1, 1),
('Solo Leveling', 1, 1),
('Blue Lock', 1, 1),
('Haikyuu', 1, 4);
