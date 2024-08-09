// 게시글 추가
//  INSERT INTO localmart.post (id, user_id, category, title, image, type, content, created_date, modified_date) VALUES (1, 1, 1, '제목', '이미지', '잡담', '내용', '2024-07-17 01:24:36.000000', '2024-07-17 01:24:38.000000')
export const insertPost=
"INSERT INTO post (userId, category, title, thumnail_filename, content)" +
"VALUES (?, ?, ?, ?, ?)"

export const getPostsByCategory = 
"SELECT * FROM post" +
"WHERE category = ?" +
"LIMIT ? OFFSET ?;";

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