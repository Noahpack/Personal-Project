CREATE TABLE posts(
id SERIAL PRIMARY KEY,
content VARCHAR(300),
rating INTEGER,
poster TEXT,
title VARCHAR(50),
user_id INT REFERENCES users(id)
);