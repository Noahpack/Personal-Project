INSERT INTO posts(title, poster, rating,  content,  user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *