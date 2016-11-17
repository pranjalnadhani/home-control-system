DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS homes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR,
  email VARCHAR UNIQUE,
  mobile_no VARCHAR UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR
);

CREATE TABLE homes (
  _id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users (_id)
);

CREATE TABLE rooms (
  _id SERIAL PRIMARY KEY,
  name VARCHAR,
  home_id INTEGER NOT NULL,

  FOREIGN KEY (home_id) REFERENCES homes (_id)
);

CREATE TABLE types (
  _id SERIAL PRIMARY KEY,
  name VARCHAR,
  default_title VARCHAR,
  brand VARCHAR,
  sensor BOOLEAN NOT NULL,
  values JSON
);

CREATE TABLE devices (
  _id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL,
  name VARCHAR,
  state BOOLEAN NOT NULL,
  values JSON,
  port VARCHAR,
  room_id INTEGER,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  FOREIGN KEY (room_id) REFERENCES rooms (_id),
  FOREIGN KEY (type_id) REFERENCES types (_id)
);

/* Database Seeds */
INSERT INTO users (username, password, email, mobile_no, first_name, last_name)
  VALUES ('sample', 'password', 'email@example.com', '9876543210', 'Sample', 'User');

INSERT INTO types (name, default_title, brand, sensor, values)
  VALUES ('bulb', 'Bulb', 'Philips', 'false', '[{"name":"brightness","units":"%"}]');

INSERT INTO types (name, default_title, brand, sensor, values)
  VALUES ('dht22', 'Temperature & Humidity Sensor', 'China', 'true', '[{"name":"temperature","units":"C"},{"name":"humidity","units":"%"}]');

/* Debug purposes */
INSERT INTO homes (name, address, user_id)
  VALUES ('My home', '8TH KM Dehradun Road Puhana Roorkee', 1);

INSERT INTO rooms (name, home_id)
  VALUES ('Bedroom', 1);

INSERT INTO devices (type_id, name, state, values, port, room_id)
  VALUES (1, 'Bulb 1', 'true', '{"brightness":"100"}', 'A2', 1);

INSERT INTO devices (type_id, name, state, values, port, room_id)
  VALUES (2, '', 'true', '{"temperature":25,"humidity":98}', 'A1', 1);
