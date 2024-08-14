export const addPostResponseDTO = ({post, images}) => {
    return { post, images };
}

export const modifyPostResponseDTO = ({post, images}) => {
    return { post, images };
}

export const postsResponseDTO = (posts, totalPage) => {
    const postsData = [];

    for (let i = 0; i < posts.length; i++) {

        postsData.push({
            "postId": posts[i].id,
            "userId": posts[i].user_id,
            "category": posts[i].category,
            "title": posts[i].title,
            "thumbnailFilename": posts[i].thumbnail_filename,
            "content": posts[i].content,
            "createdAt": formatDate(posts[i].created_at),
            "modifiedAt": formatDate(posts[i].updated_at),
            "commentNum":posts[i].commentNum,
            "likeNum": posts[i].likeNum,
        })
    }

    console.log(totalPage);

    return {
        "postData": postsData,
        "totalPage": totalPage
    };

}


export const postDetailResponseDTO = (post, images, commentNum, likeNum) => {
    console.log("comment:", commentNum[0])
    console.log("images:", images);
    post[0].created_at = formatDate(post[0].created_at);

    const imagesData = [];

    for (let i = 0; i < images.length; i++) {
        imagesData.push({
            "filename": images[i].filename
        }) 
    }

    return {
        "postId": post[0].postId,
        "userId": post[0].userId,
        "category": post[0].category,
        "title": post[0].title,
        "thumbnailFilename": post[0].thumbnailFilename,
        "content": post[0].content,
        "createdAt": post[0].createdAt,
        "commentNum": commentNum[0][0].commentNum,
        "likeNum": likeNum[0][0].likeNum,
        "imagesData": imagesData
    };
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}