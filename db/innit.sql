CREATE TABLE posts(
id SERIAL PRIMARY KEY,
content VARCHAR(300),
rating INTEGER,
poster TEXT,
title VARCHAR(50),
user_id INT REFERENCES users(id),

);
CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
password TEXT NOT NULL,
profile_pic TEXT);