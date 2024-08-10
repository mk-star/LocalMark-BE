export const insertPost=
"INSERT INTO post (userId, category, title, thumnail_filename, content)" +
"VALUES (?, ?, ?, ?, ?)"

export const getPostsByCategory =`
SELECT
    p.*,
    COALESCE(comment_count,0) AS commentNum,
    COALESCE(like_count,0) AS likeNum
FROM
    post p
LEFT JOIN (
    SELECT
        postId,
        COUNT(DISTINCT id) AS comment_count
    FROM
        localmart.comment
    GROUP BY
        postId
) c ON p.id = c.postId
LEFT JOIN (
    SELECT
        post_id,
        COUNT(id) AS like_count
    FROM
        localmart.likes
    GROUP BY
        post_id
) l ON c.postId = l.post_id
WHERE
    p.category = 1
ORDER BY
    p.created_date DESC
LIMIT 7 OFFSET 5;
`

export const getPosts = 
"SELECT * FROM post" +
"LIMIT ? OFFSET ?;";

export const getPostDetail = 
"SELECT * FROM post" +
"WHERE id = ?;";

export const updatePostSql = 
"UPDATE post SET title = ?, content = ?, category = ?, thumbnail_filename = ?" +
"WHERE id = ?;";

export const deletePostSql =
"DELETE FROM post WHERE id = ?;";

export const confirmPost =
"SELECT EXISTS(SELECT 1 FROM post WHERE id = ?) as isExistPost;";