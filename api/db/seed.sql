-- DragGarage: data contoh (seed). Jalankan SETELAH schema.sql
-- Data motor diekspor dari game Indonesian Drag Race (nama, transmisi, harga, sprite).
-- cc, horsepower, weight_kg, top_speed_kmh adalah ESTIMASI dari stat 0-100 di game.
-- Tier mengikuti kelas cc: 150 = Starter, 250 = Street, 600/1000 = Pro.

-- 15 motor
insert into motors (name, tier, transmission, cc, horsepower, weight_kg, top_speed_kmh, price, description, image_url) values
('Airox 150', 'Starter', 'matic', 150, 12.9, 134, 120, 30000000, 'Motor matic kelas 150cc dengan CVT tanpa perpindahan gigi. Nilai terkuatnya di akselerasi (55/100), harga di game Rp30.000.000.', '/motors/airox-150.png'),
('Dorio 150', 'Starter', 'matic', 150, 11.0, 140, 112, 27000000, 'Motor matic kelas 150cc dengan CVT tanpa perpindahan gigi. Nilai terkuatnya di akselerasi (53/100), harga di game Rp27.000.000.', '/motors/dorio-150.png'),
('R150', 'Starter', 'manual', 150, 22.1, 116, 145, 39000000, 'Motor manual kelas 150cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (68/100), harga di game Rp39.000.000.', '/motors/r150.png'),
('CRB150', 'Starter', 'manual', 150, 19.9, 119, 142, 37000000, 'Motor manual kelas 150cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (66/100), harga di game Rp37.000.000.', '/motors/crb150.png'),
('GIXX150', 'Starter', 'manual', 150, 16.9, 125, 148, 33000000, 'Motor manual kelas 150cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (72/100), harga di game Rp33.000.000.', '/motors/gixx150.png'),
('EXMAX250', 'Street', 'matic', 250, 32.3, 164, 140, 66000000, 'Motor matic kelas 250cc dengan CVT tanpa perpindahan gigi. Nilai terkuatnya di top speed (70/100), harga di game Rp66.000.000.', '/motors/exmax250.png'),
('CRB250RR', 'Street', 'manual', 250, 55.3, 140, 185, 80000000, 'Motor manual kelas 250cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (82/100), harga di game Rp80.000.000.', '/motors/crb250rr.png'),
('R250', 'Street', 'manual', 250, 49.6, 143, 178, 72000000, 'Motor manual kelas 250cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (80/100), harga di game Rp72.000.000.', '/motors/r250.png'),
('Shinobi250', 'Street', 'manual', 250, 44.6, 137, 176, 75000000, 'Motor manual kelas 250cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (78/100), harga di game Rp75.000.000.', '/motors/shinobi250.png'),
('Shinobi600', 'Pro', 'manual', 600, 94.6, 164, 262, 450000000, 'Motor manual kelas 600cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (92/100), harga di game Rp450.000.000.', '/motors/shinobi600.png'),
('R600', 'Pro', 'manual', 600, 85.0, 158, 262, 480000000, 'Motor manual kelas 600cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (94/100), harga di game Rp480.000.000.', '/motors/r600.png'),
('CRB600', 'Pro', 'manual', 600, 80.5, 161, 258, 550000000, 'Motor manual kelas 600cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (91/100), harga di game Rp550.000.000.', '/motors/crb600.png'),
('Shinobi1000X', 'Pro', 'manual', 1000, 190.4, 194, 299, 900000000, 'Motor manual kelas 1000cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (99/100), harga di game Rp900.000.000.', '/motors/shinobi1000x.png'),
('CRB1000XXX', 'Pro', 'manual', 1000, 171.0, 188, 299, 1050000000, 'Motor manual kelas 1000cc dengan perpindahan gigi manual. Nilai terkuatnya di top speed (98/100), harga di game Rp1.050.000.000.', '/motors/crb1000xxx.png'),
('R150 Marskald', 'Starter', 'manual', 150, 30.6, 116, 145, 45000000, 'Motor hadiah cerita yang tidak dijual di dealer, versi tenaga lebih besar dari R150 dengan transmisi manual. Masuk kelas 150cc dan harga referensi di game Rp45.000.000.', '/motors/r150-marskald.png');

-- 3 trek dari game: 201 m, 402 m, 1000 m (kesulitan diturunkan dari wear_multiplier di game)
insert into tracks (name, distance_m, difficulty, description) values
('201 Meter',   201,  'Mudah',    'Kelas standar. Reaction time dan launch menentukan segalanya. Salah start = kalah.'),
('402 Meter',   402,  'Menengah', 'Kelas menengah. Konsistensi shifting dan power band jadi penentu.'),
('1 Kilometer', 1000, 'Sulit',    'Kelas top speed. Gear panjang, panas mesin, dan napas atas motor yang bicara.');

-- 10 hasil balap (motor dan trek dicari lewat nama agar tidak perlu menulis UUID)
insert into race_results (player_name, motor_id, track_id, reaction_time_ms, elapsed_time_s, top_speed_kmh)
select r.player_name, m.id, t.id, r.reaction_time_ms, r.elapsed_time_s, r.top_speed_kmh
from (values
  ('Raka',  'Shinobi1000X',  '201 Meter',    142,  7.21, 168),
  ('Dimas', 'R250',          '201 Meter',    168,  9.34, 128),
  ('Sinta', 'Airox 150',     '201 Meter',    205, 11.92,  88),
  ('Raka',  'CRB1000XXX',    '402 Meter',    151,  9.87, 241),
  ('Citra', 'Shinobi600',    '402 Meter',    176, 11.34, 208),
  ('Eko',   'CRB250RR',      '402 Meter',    189, 13.52, 158),
  ('Dimas', 'R150 Marskald', '402 Meter',    194, 15.21, 129),
  ('Raka',  'Shinobi1000X',  '1 Kilometer',  147, 19.84, 262),
  ('Sinta', 'R600',          '1 Kilometer',  184, 22.76, 238),
  ('Eko',   'EXMAX250',      '1 Kilometer',  212, 38.45, 138)
) as r(player_name, motor_name, track_name, reaction_time_ms, elapsed_time_s, top_speed_kmh)
join motors m on m.name = r.motor_name
join tracks t on t.name = r.track_name;
