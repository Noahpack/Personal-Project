SELECT p.title, p.id, u.username
FROM posts p 
JOIN users u ON p.user_id = u.id
WHERE p.id = $1