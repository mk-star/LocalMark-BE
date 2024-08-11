export const addPostResponseDTO = ({post, images}) => {
    return { post, images };
}

export const modifyPostResponseDTO = ({post, images}) => {
    return { post, images };
}

export const postsResponseDTO = (posts) => {
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

    return {"postData": postsData};

}


export const postDetailResponseDTO = ({ post, images }, commentNum, likeNum) => {

    console.log("post detail:", post);
    console.log("images:", images);
    post.created_at = formatDate(post[0].created_at);

    const imagesData = [];

    for (let i = 0; i < images.length; i++) {
        imagesData.push({
            "filename": images[i].filename
        }) 
    }

    return {
        "post": post,
        "commentNum": commentNum,
        "likeNum": likeNum,
        "imagesData": imagesData
    };
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}