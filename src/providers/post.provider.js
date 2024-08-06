import { previewPostsResponseDTO } from "../dtos/post.dto.js"
import { getPreviewPosts, getPreviewPostsByCategory } from "../models/post.dao.js"

export const getPosts = async(category, page) => {

    if(category) {
        return previewPostsResponseDTO(await getPreviewPostsByCategory(category, page));
    } else {
        return previewPostsResponseDTO(await getPreviewPosts(page));
    }

}