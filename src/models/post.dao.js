import { status } from "../../config/response.status.js";
import { 
    confirmPost, 
    deletePostSql, 
    getPostDetail, 
    getPosts, 
    getPostsByCategory, 
    getPostsByCreatorId, 
    insertPost, 
    updatePostSql,
    getImageFilesByPostId,
    deleteImgsFileByPostId,
    insertPostImagesyPostId,
    totalPosts} from "./post.sql.js";
import { confirmBrand, getCreatorIdByBrandId } from "./brand.sql.js";
import { BaseError } from "../../config/error.js";
import { pool } from "../../config/db.config.js";
import { s3 } from "../middleware/image.uploader.js";

export const addPost = async (data) => {
  
    try{
        const conn = await pool.getConnection();
        const [addPost] = await pool.query(insertPost, [data.userId, data.category, data.title, data.thumnail_filename, data.content]);
        
        conn.release();

        return addPost.insertId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
    
}


export const getPreviewPosts = async (category, page) => {

    try {
        const conn = await pool.getConnection();

        const limit = 7;
        const offset = (page - 1) * limit;
    
        //전체 게시글 수 조회 및 페이지 수
        const [totalPost] = await pool.query(totalPosts);
        const totalPostCount = totalPost[0].totalPosts;

        let totalPage;
        if(totalPostCount < limit) {
            totalPage = 1;
        } else if(totalPostCount % limit > 0) {
            totalPage = totalPostCount / 7 + 1;
        } else {
            totalPage = totalPostCount / 7;
        } 

        let posts = [];
        if (!category) {
            [posts] = await pool.query(getPosts, [limit, offset]);
        } else {
            [posts] = await pool.query(getPostsByCategory, [category, limit, offset]);
        }
        conn.release();

        return { posts, totalPage };

    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const getPreviewPostDetail = async (postId) => {

    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmPost, [postId]);

        if (!confirm[0].isExistPost) {
            conn.release();
            return -1;
        }

        const [post] = await pool.query(getPostDetail, [postId]);
        
        const [images] = await pool.query(getImageFilesByPostId, [postId]);

        conn.release();

        return { post, images };
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const modifyPostById = async (data) => {
    
    try {

        const conn = await pool.getConnection();
        
        const postId = data.postId;

        const [confirm] = await pool.query(confirmPost, [postId]);


        if (!confirm[0].isExistPost) {
            conn.release();
            return -1;
        }

        let thumbnail_filename = null;
        console.log(data.thumbnail_filename);
        if(data.thumbnail_filename) {
            thumbnail_filename = data.thumbnail_filename;
        }
    
        const [result] = await pool.query(updatePostSql, [
            data.category,
            data.title,
            thumbnail_filename,
            data.content,
            postId,
        ]);

        console.log('post 수정 완료');

        const newImagekeys = data.newImagekeys;
        if (newImagekeys[0]) {
            await updatePostImages(postId, newImagekeys);
            console.log("이미지 수정완료");
        }

        conn.release();

        return result.affectedRows;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}


export const deletePost = async (postId) => {
    
    try {
        console.log(postId);
      const conn = await pool.getConnection();
  
      const [confirm] = await pool.query(confirmPost, [postId]);

      console.log(confirm[0]);
      if (!confirm[0].isExistPost) {
        conn.release();
        return -1;
      }

      const [row] = await pool.query(getImageFilesByPostId, [postId]);
      const images = row.map((row) => row.filename);
  
      for (const imageFilename of images) {
        await deletePostImages(imageFilename);
      }

      const [result] = await pool.query(deletePostSql, [postId]);
  
      conn.release();
      return result.affectedRows;
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }

}

export const getCreatorByBrandId = async (brandId) => {

    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmBrand, brandId);

        if (!confirm[0].isExistBrand) {
            conn.release();
            return -1;
        }

        const creatorId = await pool.query(getCreatorIdByBrandId, brandId);
        conn.release();

        return creatorId[0];
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const getPostsByCreator = async(creatorId) => {

    try {
        
        const conn = await pool.getConnection();

        const [result] = await pool.query(getPostsByCreatorId, creatorId);
        conn.release();

        return result;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}


export const saveImagesByPostId = async (postId, imagekey) => {

    try {
        const conn = await pool.getConnection();

        const encodedKey = encodeURIComponent(imagekey);

        const [result] = await pool.query(insertPostImagesyPostId, [postId, encodedKey]);
        conn.release();

        return result;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const updatePostImages = async(postId, newImagekeys) => {
    
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(getImageFilesByPostId, [postId]);
        const currentImages = rows.map((row) => row.filename);
        
        if(currentImages.length > 0) {
            for (const filename of currentImages) {
                console.log(filename);
                await deletePostImages(filename);
            }
        }

        console.log('s3이미지 삭제');

        await pool.query(deleteImgsFileByPostId,[postId]);

        if (newImagekeys[0]) {
            for (let i = 0; i < newImagekeys.length; i++) {
                console.log(newImagekeys[i]);
                await saveImagesByPostId(postId, newImagekeys[i]);
            }
        }
        
        conn.release();
        
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}


export const deletePostImages = async (filename) => {
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: decodeURIComponent(filename),
    };
  
    try {
      s3.deleteObject(params, function (error, data) {
        if (error) {
            console.log(`Error deleting ${filename}:`, error);
            console.log("err: ", error, error.stack);
        } else {
            console.log(data, " 정상 삭제 되었습니다.");
        }
      });
    } catch (err) {
      throw err;
    }
  };
