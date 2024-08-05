// 게시글 추가
export const createPost= `
INSERT INTO Post (userId, category, title, content)
  VALUES (?, ?, ?, ?)
`

export const confirmPost =`SELECT EXISTS(SELECT 1 FROM Post WHERE id = ?) AS isExistPost;`

export const uploadImages = `INSERT INTO PostImage (post_id, imageUrl) VALUES (?, ?)`

export const getPostsByCategory =
    "SELECT * FROM post" +
    "WHERE category = ?" +
    "LIMIT ? OFFSET ?;";

export const getPosts =
    "SELECT * FROM post" +
    "LIMIT ? OFFSET ?;";