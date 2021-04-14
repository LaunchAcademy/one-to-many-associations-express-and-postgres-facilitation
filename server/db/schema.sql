CREATE TABLE enchanted_forests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE unicorns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  enchanted_forest_id INTEGER REFERENCES enchanted_forests(id)
);