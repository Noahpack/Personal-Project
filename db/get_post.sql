SELECT p.title, p.poster, p.rating, p.content, u.username, u.id
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.id = $1; 