export const previewPostsResponseDTO = (data) => {
    const posts = [];

    for (let i = 0; i < data.length; i++) {
        posts.push({
            "post_id": data[i].id,
            "user_id": data[i].user_id,
            "category": data[i].category,
            "title": data[i].title,
            "thumbnail_url": data[i].thumnail_url,
            "content": data[i].content,
            "created_date": formatDate(data[i].created_date),
            "modified_date": formatDate(data[i].modified_date)
        })
    }

    return {"postData": posts};

}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}