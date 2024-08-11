export const CommentTreeDTO = (comments) => {
    console.log(comments);

    const commentMap = new Map();
    const rootComments = [];

    comments.forEach((comment) => {
        // CommentDTO 형태로 변환
        const dto = {
            id: comment.id,
            postId: comment.post_id,
            userId: comment.user_id,
            content: comment.content,
            createdDate: formatDate(comment.created_at), // 문자열을 Date 객체로 변환
            parentId: comment.parent_id,
            children: []
        };

        // 댓글 ID를 키로 사용하여 Map에 저장
        if (!commentMap.has(dto.id)) {
            commentMap.set(dto.id, dto);
        }

        // 부모 댓글이 없는 경우 (최상위 댓글) 루트 목록에 추가
        if (dto.parentId === null) {
            if (!rootComments.some(root => root.id === dto.id)) {
                rootComments.push(dto);
            }
        } else {
            // 자식 댓글이 있는 경우, 부모 댓글의 children에 추가
            const parentComment = commentMap.get(dto.parentId);
            if (parentComment) {
                if (!parentComment.children.some(child => child.id === dto.id)) {
                    parentComment.children.push(dto);
                }
            }
        }
    });

    return rootComments;
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}
