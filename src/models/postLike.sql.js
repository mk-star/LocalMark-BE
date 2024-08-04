// 유저가 이미 좋아요를 했는지 확인
export const likeWhether = `
select id from post_like where post_id= ? AND user_id = ?;
`

// 좋아요 추가
export const addLike = `
insert into post_like(post_id,user_id) values(?,?);
`

// 좋아요 취고
export const deleteLike= `
DELETE FROM post_like
WHERE post_id = 1 AND user_id = 1;
`