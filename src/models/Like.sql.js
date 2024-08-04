// 유저가 이미 게시글 좋아요를 했는지 확인
export const postLikeWhether = `
select id from post_like where post_id= ? AND user_id = ?;
`

// 게시글 좋아요 추가
export const postAddLike = `
insert into post_like(post_id,user_id) values(?,?);
`

// 게시글 좋아요 취소
export const postDeleteLike= `
DELETE FROM post_like
WHERE post_id = 1 AND user_id = 1;
`
// 유저가 이미 댓글 좋아요를  했는지 확인

// 댓글 좋아요 추가

// 댓글 좋아요 취소