import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { s3 } from "../middleware/image.uploader.js";
import { getLetterList, recentLetters, confirmLetter, getLetterInfo, getLetterInfoImage, getEventList, confirmEvent, getEventInfo, getEventInfoImage, recentEvents, insertLetter, insertLetterImage, updateLetter, selectLetterImage, deleteLetterImage, deleteLetter, insertEvent, insertEventImage, updateEvent, selectEventImage, deleteEventImage, deleteEvent } from "./morelocal.sql.js";

// 로컬레터 목록 조회
export const getLetters = async () => {
    try {
        const conn = await pool.getConnection();
        const [letters] = await pool.query(getLetterList);
        
        conn.release();
        return letters;
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 상세 조회
export const getLetterDetail = async (letterId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmLetter, letterId);
        if (!confirm[0].isExistLetter) {
          conn.release();
          return -1;
        }
        
        const letter = await pool.query(getLetterInfo, letterId);
        const [images] = await pool.query(getLetterInfoImage, letterId);
        const imageUrls = images.map(image => image.filename);

        conn.release();
        return {letter: letter[0], images: imageUrls};
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 최근 업데이트글 6개
export const getRecentLetters = async() => {
    try {
        const conn = await pool.getConnection();

        const [letters] = await pool.query(recentLetters);

        conn.release();
        return letters;
        
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 목록 조회
export const getEvents = async () => {
    try {
        const conn = await pool.getConnection();

        const [events] = await pool.query(getEventList);

        conn.release();
        return events;
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 상세 조회
export const getEventDetail = async (eventId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmEvent, eventId);
        if (!confirm[0].isExistEvent) {
          conn.release();
          return -1;
        }

        const event = await pool.query(getEventInfo, eventId);
        const [images] = await pool.query(getEventInfoImage, eventId);
        const imageUrls = images.map(image => image.filename);
        conn.release();
        return {event: event[0], images: imageUrls};
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 최근 업데이트글 6개
export const getRecentEvents = async() => {
    try {
        const conn = await pool.getConnection();

        const [events] = await pool.query(recentEvents);

        conn.release();
        return events;
        
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 생성
export const addLetter = async(letter, imageList) => {
    try {
        const conn = await pool.getConnection();

        const letterImage = imageList.map((key) => {
            // const encodedKey = encodeURIComponent(key);
            const encodedKey = key;
            return [encodedKey];
        });

        const [newLetter] = await pool.query(insertLetter, [letter.title, letterImage[0][0], letter.content, letter.category]);

        conn.release();
        return newLetter.insertId;
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 생성 - 이미지
export const addLetterImage = async(letterId, imageList) => {
    try {
        const conn = await pool.getConnection();

        const letterImages = imageList.map((key) => {
            // const encodedKey = encodeURIComponent(key);
            const encodedKey = key;
            return [letterId, encodedKey];
        });
      
          await pool.query(insertLetterImage, [letterImages]);
      
          conn.release();
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 수정
export const modifyLetterById = async (data, imageList) => {
    try {
        const conn = await pool.getConnection();
  
        // const [confirm] = await pool.query(confirmLetter, [data.letterId]);
        // if (!confirm[0].isExistLetter) {
        //     conn.release();
        //     return -1;
        // }
  
        const letterImage = imageList.map((key) => {
            // const encodedKey = encodeURIComponent(key);
            const encodedKey = key;
            return [encodedKey];
        });

        const [letter] = await pool.query(updateLetter, [
            data.title,
            letterImage[0][0],
            data.content,
            data.category,
            data.letterId
        ]);
  
        conn.release();
        return letter.affectedRows;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 로컬레터 수정 - 사진
export const updateLetterImages = async (letterId, imageKey) => {
    try {
      const conn = await pool.getConnection();
  
      const [rows] = await pool.query(selectLetterImage, [letterId]);
      const currentImages = rows.map((row) => row.filename);
  
      for (const filename of currentImages) {
        await deleteLetterImages(filename);
      }
  
      await pool.query(deleteLetterImage, [letterId]);
  
      if (imageKey && imageKey.length > 0) {
        await addLetterImage(letterId, imageKey);
      }
  
      conn.release();
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  };


// 로컬레터 삭제 - 사진
export const deleteLetterImages = async (filename) => {

    const bucketUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REAGION}.amazonaws.com/`;

    // URL에서 Key 추출
    const filenameKey = decodeURIComponent(filename).replace(bucketUrl, '');

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: decodeURIComponent(filenameKey),
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

// 로컬레터 삭제
export const deleteLetterById = async (letterId) => {
    try {
      const conn = await pool.getConnection();
  
      const [confirm] = await pool.query(confirmLetter, [letterId]);
      if (!confirm[0].isExistLetter) {
        conn.release();
        return -1;
      }
  
      const [rows] = await pool.query(selectLetterImage, [letterId]);
      const currentImages = rows.map((row) => row.filename);
  
      for (const filename of currentImages) {
        await deleteLetterImages(filename);
      }
  
      const [letter] = await pool.query(deleteLetter, [letterId]);
  
      conn.release();
      return letter.affectedRows;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  };
  

// 이벤트 생성
export const addEvent = async(event, imageList) => {
  try {
      const conn = await pool.getConnection();

      const eventImage = imageList.map((key) => {
          // const encodedKey = encodeURIComponent(key);
          const encodedKey = key;
          return [encodedKey];
      });

      const [newEvent] = await pool.query(insertEvent, [event.title, eventImage[0][0], event.content, event.start_date, event.end_date, event.subregion_id]);

      conn.release();
      return newEvent.insertId;
      
  } catch (err) {
      throw new Error(status.PARAMETER_IS_WRONG)
  }
}

// 이벤트 생성 - 이미지
export const addEventImage = async(eventId, imageList) => {
  try {
      const conn = await pool.getConnection();

      const eventImages = imageList.map((key) => {
          // const encodedKey = encodeURIComponent(key);
          const encodedKey = key;
          return [eventId, encodedKey];
      });
    
        await pool.query(insertEventImage, [eventImages]);
    
        conn.release();
  } catch (err) {
      throw new Error(status.PARAMETER_IS_WRONG)
  }
}