-- DragGarage: skema database (jalankan di Supabase > SQL Editor)
-- Urutan: jalankan file ini dulu, baru seed.sql

-- Hapus tabel lama supaya skrip bisa dijalankan ulang (urutan: anak dulu)
drop table if exists race_results;
drop table if exists tracks;
drop table if exists motors;

-- Tabel motor: katalog motor fiktif di game
create table motors (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  tier          text not null check (tier in ('Starter', 'Street', 'Pro')),
  transmission  text not null check (transmission in ('matic', 'manual')),
  cc            int not null check (cc > 0),
  horsepower    numeric not null check (horsepower > 0),
  weight_kg     numeric not null check (weight_kg > 0),
  top_speed_kmh int not null check (top_speed_kmh > 0),
  price         int not null check (price >= 0),   -- harga di dalam game
  description   text,
  image_url     text,                              -- path relatif, mis. /motors/ub-110.svg
  created_at    timestamptz not null default now()
);

-- Tabel trek: lintasan balap
create table tracks (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  distance_m  int not null check (distance_m > 0),  -- 201, 402, 1000
  difficulty  text,
  description text,
  created_at  timestamptz not null default now()
);

-- Tabel hasil balap: leaderboard (relasi ke motor dan trek)
create table race_results (
  id               uuid primary key default gen_random_uuid(),
  player_name      text not null,
  motor_id         uuid not null references motors(id) on delete cascade,
  track_id         uuid not null references tracks(id) on delete cascade,
  reaction_time_ms int not null check (reaction_time_ms >= 0),
  elapsed_time_s   numeric not null check (elapsed_time_s > 0),
  top_speed_kmh    int not null check (top_speed_kmh > 0),
  created_at       timestamptz not null default now()
);

-- Index untuk mempercepat filter dan pengurutan leaderboard
create index idx_results_track on race_results(track_id);
create index idx_results_motor on race_results(motor_id);
create index idx_results_elapsed on race_results(elapsed_time_s);
