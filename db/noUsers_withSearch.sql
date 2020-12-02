SELECT p.title, p.id, u.username, u.poster
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE u.id != $2 AND title LIKE '%' || $1 || '%'