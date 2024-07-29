import { addPost } from '../models/post.dao'

export const addPostInfo =async (body) =>{
  const { userId, category, title, image, type, content} = body;
  console.log(userId)

  const result = await addPost(userId, category, title, image, type, content);
  return result

export const getPostsByCategory = async(category, page) => {

    try {
        
    } catch (error) {
        
    }

}