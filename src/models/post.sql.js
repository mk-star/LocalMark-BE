// 게시글 추가
export const createPost= `
INSERT INTO Post (userId, category, title, image, type, content)
  VALUES (?, ?, ?, ?, ?, ?)
`

export const postExists =`SELECT id FROM Post WHERE id = ?;`
