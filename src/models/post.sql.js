// 게시글 추가
//  INSERT INTO localmart.post (id, user_id, category, title, image, type, content, created_date, modified_date) VALUES (1, 1, 1, '제목', '이미지', '잡담', '내용', '2024-07-17 01:24:36.000000', '2024-07-17 01:24:38.000000')
export const createPost= `
INSERT INTO Post (userId, category, title, image, type, content)
  VALUES (?, ?, ?, ?, ?, ?)
`