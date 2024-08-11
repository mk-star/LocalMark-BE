export const insertPost=
 `INSERT INTO Post (user_id, category, title, thumbnail_filename, content)
VALUES (?, ?, ?, ?, ?) `

export const getPosts = 
`SELECT * FROM Post LIMIT ? OFFSET ?;`

export const getPostDetail = `
SELECT * 
FROM Post 
WHERE id = ?;
`

export const updatePostSql =  `
UPDATE Post SET title = ?, content = ?, category = ?, thumbnail_filename = ?
WHERE id = ?;
`

export const deletePostSql = `
DELETE FROM Post WHERE id = ?;
`
"INSERT INTO Post (user_Id, category, title, thumnail_filename, content)" +
"VALUES (?, ?, ?, ?, ?)"

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
        localmart.comment
    GROUP BY
        post_id
) c ON p.id = c.post_id
LEFT JOIN (
    SELECT
        post_id,
        COUNT(id) AS like_count
    FROM
        localmart.likes
    GROUP BY
        post_id
) l ON c.post_id = l.post_id
WHERE
    p.category = 1
ORDER BY
    p.created_at DESC
LIMIT 7 OFFSET 5;
`

export const confirmPost =
 `SELECT EXISTS(SELECT 1 FROM Post WHERE id = ?) as isExistPost;`

export const getPostsByCreatorId =
 `SELECT * FROM Post
WHERE user_id = ?; `

export const getImageFilesByPostId = 
`SELECT filename FROM Post_Image WHERE post_id = ?`

export const insertPostImagesyPostId =
`INSERT INTO Post_Image (post_id, filename) VALUES (?, ?);`


export const deleteImgsFileByPostId =
`DELETE FROM Post_Image WHERE post_id = ?`


