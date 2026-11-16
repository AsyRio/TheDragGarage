-- DragGarage: data contoh (seed). Jalankan SETELAH schema.sql
-- Semua nama motor fiktif ("terinspirasi" saja), tanpa merek asli.

-- 5 motor: campuran matic/manual dan tier berbeda
insert into motors (name, tier, transmission, cc, horsepower, weight_kg, top_speed_kmh, price, description, image_url) values
('UB-110',     'Starter', 'matic',  110,  8.5,  98,  95,  15000,
 'Motor matic harian yang ringan dan mudah dikendalikan. Pilihan pas untuk pemula yang baru belajar start dan reaksi.',
 '/motors/ub-110.svg'),
('Kilat 135',  'Street',  'manual', 135, 12.5, 108, 115,  45000,
 'Motor bebek manual dengan akselerasi lincah di putaran bawah. Cocok untuk melatih timing perpindahan gigi.',
 '/motors/kilat-135.svg'),
('Banteng SR', 'Street',  'matic',  155, 15.2, 118, 118,  60000,
 'Skuter matic bertenaga dengan torsi besar. Enak untuk start, tetapi tenaganya cepat habis di trek panjang.',
 '/motors/banteng-sr.svg'),
('Rajawali 200', 'Pro',   'manual', 200, 24.0, 125, 145, 120000,
 'Motor sport manual seimbang antara tenaga dan bobot. Andalan pembalap menengah di trek 402 m.',
 '/motors/rajawali-200.svg'),
('Naga X-250', 'Pro',     'manual', 250, 32.0, 132, 165, 200000,
 'Motor paling kencang di katalog. Tenaga besar dan top speed tinggi, tetapi butuh teknik start yang presisi.',
 '/motors/naga-x-250.svg');

-- 3 trek: 201 m, 402 m, 1000 m
insert into tracks (name, distance_m, difficulty, description) values
('Sprint 201',   201,  'Mudah',  'Lintasan pendek klasik. Hasil sangat ditentukan oleh waktu reaksi dan akselerasi awal.'),
('Klasik 402',   402,  'Sedang', 'Seperempat mil. Menuntut kombinasi start bagus dan pengaturan gigi yang tepat.'),
('Maraton 1000', 1000, 'Sulit',  'Lintasan panjang yang menguji top speed dan ketahanan tenaga motor.');

-- 10 hasil balap (motor dan trek dicari lewat nama agar tidak perlu menulis UUID)
insert into race_results (player_name, motor_id, track_id, reaction_time_ms, elapsed_time_s, top_speed_kmh)
select r.player_name, m.id, t.id, r.reaction_time_ms, r.elapsed_time_s, r.top_speed_kmh
from (values
  ('Raka',  'Naga X-250',    'Sprint 201',    142,  8.52, 135),
  ('Dimas', 'Rajawali 200',  'Sprint 201',    168,  9.24, 118),
  ('Sinta', 'Kilat 135',     'Sprint 201',    195, 10.93,  92),
  ('Bayu',  'UB-110',        'Sprint 201',    231, 12.81,  78),
  ('Raka',  'Naga X-250',    'Klasik 402',    151, 13.14, 158),
  ('Citra', 'Rajawali 200',  'Klasik 402',    176, 14.87, 138),
  ('Eko',   'Kilat 135',     'Klasik 402',    210, 17.65, 108),
  ('Dimas', 'Banteng SR',    'Klasik 402',    189, 18.21, 110),
  ('Raka',  'Naga X-250',    'Maraton 1000',  147, 25.63, 162),
  ('Sinta', 'Rajawali 200',  'Maraton 1000',  184, 29.84, 142)
) as r(player_name, motor_name, track_name, reaction_time_ms, elapsed_time_s, top_speed_kmh)
join motors m on m.name = r.motor_name
join tracks t on t.name = r.track_name;
