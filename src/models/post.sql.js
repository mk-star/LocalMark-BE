export const insertPost=
 `INSERT INTO Post (user_id, category, title, thumbnail_filename, content)
VALUES (?, ?, ?, ?, ?) `

export const getPosts = 
`SELECT
    p.*,
    COALESCE(comment_count,0) AS commentNum,
    COALESCE(like_count,0) AS likeNum
FROM
    Post p
LEFT JOIN (
    SELECT
        post_id,
        COUNT(DISTINCT id) AS comment_count
    FROM
        localmark.Comment
    GROUP BY
        post_id
) c ON p.id = c.post_id
LEFT JOIN (
    SELECT
        post_id,
        COUNT(id) AS like_count
    FROM
        localmark.Likes
    GROUP BY
        post_id
) l ON c.post_id = l.post_id
ORDER BY
    p.created_at DESC
LIMIT ? OFFSET ?;`

export const totalPostsByCategory = 
`SELECT COUNT(*) AS totalPosts FROM Post WHERE category = ?;`

export const totalPosts = 
`SELECT COUNT(*) AS totalPosts FROM Post;`


export const getPostDetail = `
SELECT * 
FROM Post 
WHERE id = ?;
`

export const updatePostSql = `
UPDATE Post 
SET category = ?, title = ?, thumbnail_filename = ?, content = ?
WHERE id = ?;
`

export const deletePostSql = `
DELETE FROM Post WHERE id = ?;
`

export const getPostsByCategory =`
SELECT
    p.*,
    COALESCE(comment_count,0) AS commentNum,
    COALESCE(like_count,0) AS likeNum
FROM
    Post p
LEFT JOIN (
    SELECT
        post_id,
        COUNT(DISTINCT id) AS comment_count
    FROM
        localmark.Comment
    GROUP BY
        post_id
) c ON p.id = c.post_id
LEFT JOIN (
    SELECT
        post_id,
        COUNT(id) AS like_count
    FROM
        localmark.Likes
    GROUP BY
        post_id
) l ON c.post_id = l.post_id
WHERE
    p.category = ?
ORDER BY
    p.created_at DESC
LIMIT ? OFFSET ?;
`

export const confirmPost =
 `SELECT EXISTS(SELECT 1 FROM Post WHERE id = ?) as isExistPost;`

export const getPostsByCreatorId =
 `SELECT * FROM Post
WHERE user_id = ?;`

export const getImageFilesByPostId = 
`SELECT filename FROM Post_Image WHERE post_id = ?`

export const insertPostImagesyPostId =
`INSERT INTO Post_Image (post_id, filename) VALUES (?, ?);`

export const deleteImgsFileByPostId =
`DELETE FROM Post_Image WHERE post_id = ?`


