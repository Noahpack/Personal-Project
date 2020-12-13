UPDATE posts
SET 
rating = $2
WHERE
id = $1;

SELECT * FROM posts