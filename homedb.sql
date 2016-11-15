/*
DROP DATABASE IF EXISTS homedb;
CREATE DATABASE homedb OWNER homedb;

\c homedb;
*/
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
  values JSON
);

CREATE TABLE devices (
  _id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL,
  name VARCHAR,
  state BOOLEAN NOT NULL,
  sensor BOOLEAN NOT NULL,
  values JSON,
  port INTEGER,
  room_id INTEGER,

  FOREIGN KEY (room_id) REFERENCES rooms (_id),
  FOREIGN KEY (type_id) REFERENCES types (_id)
);

/* Database Seeds */
INSERT INTO users (username, password, email, mobile_no, first_name, last_name)
  VALUES ('sample', 'password', 'email@example.com', '9876543210', 'Sample', 'User');

INSERT INTO types (name, default_title, brand, values)
  VALUES ('bulb', 'Bulb', 'Philips', '[{"name": "intensity", "units":"units"}]');

INSERT INTO types (name, default_title, brand, values)
  VALUES ('dht22', 'Temperature & Humidity Sensor', 'China', '[{"name": "temperature", "units":"degrees"}, {"name": "humidity", "units":"percentage"}]');
