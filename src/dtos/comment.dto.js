export const CommentTreeDTO = (comments)=> {

    const commentMap = new Map();
    const rootComments = [];

    comments.forEach((comment) => {
        // CommentDTO 형태로 변환
        const dto = {
            id: comment.id,
            postId: comment.postId,
            userId: comment.userId,
            content: comment.content,
            createdDate: formatDate(comment.created_date), // 문자열을 Date 객체로 변환
            parentId: comment.parentId,
            children: []
        };

        // 댓글 ID를 키로 사용하여 Map에 저장
        commentMap.set(dto.id, dto);

        // 부모 댓글이 없는 경우 (최상위 댓글) 루트 목록에 추가
        if (dto.parentId === null) {
            rootComments.push(dto);
        } else {
            // 자식 댓글이 있는 경우, 부모 댓글의 children에 추가
            const parentComment = commentMap.get(dto.parentId);
            if (parentComment) {
                parentComment.children.push(dto);
            }
        }
    });

    return rootComments;
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}