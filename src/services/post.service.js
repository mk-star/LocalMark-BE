import { addPost } from '../models/post.dao.js'

export const addPostInfo =async (body) =>{
  const { userId, category, title, images, content} = body;
  const result = await addPost(userId, category, title, images, content);
  return result
}

export const getPostsByCategory = async(category, page) => {

    try {
        
    } catch (error) {
        
    }

}
