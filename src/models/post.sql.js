// 게시글 추가
export const createPost= `
INSERT INTO Post (userId, category, title, content)
  VALUES (?, ?, ?, ?)
`

export const postExists =`SELECT id FROM Post WHERE id = ?;`

export const uploadImages = `INSERT INTO PostImage (postId, imageUrl) VALUES (?, ?)`

export const getPostsByCategory =
    "SELECT * FROM post" +
    "WHERE category = ?" +
    "LIMIT ? OFFSET ?;";

export const getPosts =
    "SELECT * FROM post" +
    "LIMIT ? OFFSET ?;";