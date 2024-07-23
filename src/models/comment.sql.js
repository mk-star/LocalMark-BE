//대댓글 추가 
export const addCommentChild = `
insert into Comment(userId, postId,parentId,content) values (?,?,?,?);
`
// 댓글 추가
export const addComment = `
insert into Comment(userId, postId,content) values (?,?,?);
`

export const deleteComment =`
DELETE FROM Comment WHERE id IN (?);
`
export const deleteChildComments = `DELETE FROM Comment WHERE parentId IN (?)`;

// 댓글/대댓글 조회
export const selectComment = `
WITH RECURSIVE CommentTree AS (
    SELECT
        c.id,
        c.postId,
        c.userId,
        c.content,
        c.created_date,
        c.parentId
    FROM
        Comment c
    WHERE
        c.postId = ?

    UNION ALL

    -- 대댓글을 재귀적으로 선택
    SELECT
        cm.id,
        cm.postId,
        cm.userId,
        cm.content,
        cm.created_date,
        cm.parentId
    FROM
        Comment cm
    JOIN
        CommentTree ct ON cm.parentId = ct.id  -- 대댓글의 부모 댓글과 연결
)

SELECT *
FROM CommentTree
ORDER BY created_date;

`