INSERT INTO post(poster, content, rating, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *