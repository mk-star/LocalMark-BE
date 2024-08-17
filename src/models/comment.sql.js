//레코드 존재1, 존재X =0
export const confirmCommend = `
SELECT EXISTS(SELECT 1 FROM Comment WHERE id = ?) AS isExistComment; 
`

//대댓글 추가
export const addCommentChild = `
insert into Comment(user_id, post_id,parent_id,content) values (?,?,?,?);
`
// 댓글 추가
export const addComment = `
insert into Comment(user_id, post_id,content) values (?,?,?);
`

export const deleteComment =`
DELETE FROM Comment WHERE id IN (?);
`
export const deleteChildComments = `DELETE FROM Comment WHERE parent_id IN (?)`;

// 댓글/대댓글 조회
export const selectComment = `
WITH RECURSIVE CommentTree AS (
    SELECT
        c.id,
        c.post_id,
        c.user_id,
        c.content,
        c.created_at,
        c.parent_id
    FROM
        Comment c
    WHERE
        c.post_id = ?

    UNION ALL

    -- 대댓글을 재귀적으로 선택
    SELECT
        cm.id,
        cm.post_id,
        cm.user_id,
        cm.content,
        cm.created_at,
        cm.parent_id
    FROM
        Comment cm
    JOIN
        CommentTree ct ON cm.parent_id = ct.id  -- 대댓글의 부모 댓글과 연결
)

SELECT DISTINCT id, post_id, user_id, content, created_at, parent_id
FROM CommentTree
ORDER BY created_at;

`

export const commentNum = `
select count(*) as commentNum from Comment where post_id = ?
`