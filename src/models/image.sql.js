
export const insertPostImagesyPostId =
"INSERT INTO Post_Image (post_id, filename)" + 
"VALUES (?, ?);";

export const deleteImgsFileByPostId =
"DELETE FROM Post_Image" +
"WHERE post_id = ?"

export const confirmImageByPostId = 
"SELECT EXISTS(SELECT 1 FROM Post_Image WHERE post_id = ?) as isExistImageByPostId;";
