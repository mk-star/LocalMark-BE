// 게시글 추가
//  INSERT INTO localmart.post (id, user_id, category, title, image, type, content, created_date, modified_date) VALUES (1, 1, 1, '제목', '이미지', '잡담', '내용', '2024-07-17 01:24:36.000000', '2024-07-17 01:24:38.000000')
export const insertPost=
 `INSERT INTO Post (user_id, category, title, thumbnail_filename, content)
VALUES (?, ?, ?, ?, ?) `

export const getPostsByCategory = `
SELECT *
FROM Post
WHERE category = ? LIMIT ? OFFSET ?
`

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

