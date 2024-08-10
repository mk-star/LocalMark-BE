import { 
    confirmImage, 
    confirmImageByPostId, 
    deleteImgFileById, 
    deleteImgsFileByPostId, 
    getImageFileById, 
    getImageFilesByPostId } from './image.sql.js';
import { status } from '../../config/response.status';
import { insertPostImagesyPostId } from './image.sql';

export const saveImagesByPostId = async (postId, imagekeys) => {

    try {

        const conn = await pool.getConnection();

        const imageRecords = imagekeys.map((key) => {
            const encodedKey = encodeURIComponent(key);
            return [postId, encodedKey];
          });

        await pool.query(insertPostImagesyPostId, [imageRecords]);

        conn.release();

    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const updatePostImages = async(postId, imagekeys) => {
    try {

        const conn = await pool.getConnection();
        const [rows] = await pool.query(getImageFileById, postId);
        const currentImages = rows.map((row) => row.filename);
    
        for (const filename of currentImages) {
            await deletePostImages(filename);
        }

        
        await pool.query(deleteImgsFileByPostId, postId);

        if (imagekeys && imagekeys.length > 0) {
            await saveImagesByPostId(reviewId, imageKey);
        }
        
        conn.release();
        
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }


}

// DB 에서 이미지 아이디에 해당하는 이미지 파일 이름 조회
export const getImageById = async (imageId) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmImage, imageId);

        if(!confirm[0].isExistImage) {
            conn.release();
            return -1;
        }

        const [result] = await pool.query(getImageFilesByPostId, imageId);
        
        conn.release();

        return result[0].filename;
        
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }

}

// DB 에서 해당 게시글의 이미지 정보 조회
export const getImagesByPostId = async (postId) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmImage, imageId);

        if(!confirm[0].isExistImage) {
            conn.release();
            return -1;
        }

        const [images] = await pool.query(getImageFilesByPostId, postId);
        
        conn.release();

        // 이미지 ID와 파일명을 포함한 객체 배열로 반환
        return images.map(image => ({
                id: image.id,
                filename: image.filename
        }));

    }catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }
    
}

export const deleteImageById = async (imageId) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmImage, imageId);

        if(!confirm[0].isExistImage) {
            conn.release();
            return -1;
        }

        const [result] = await pool.query(deleteImgFileById, imageId);

        return result[0].affectedRows;
        
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }

}

export const deleteImageByPostId = async (postId, filename) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmImageByPostId, postId);

        if(!confirm.isExistImageByPostId) {
            conn.release();
            return -1;
        }

        const [result] = await pool.query(deleteImgsFileByPostId, postId);

        return result[0].affectedRows;

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
          console.log("err: ", error, error.stack);
        } else {
          console.log(data, " 정상 삭제 되었습니다.");
        }
      });
    } catch (err) {
      throw err;
    }
  };