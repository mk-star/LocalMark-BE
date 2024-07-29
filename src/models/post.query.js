export const getPostsByCategory = 
"SELECT * FROM post" +
"WHERE category = ?" +
"LIMIT ? OFFSET ?;";

export const getPosts = 
"SELECT * FROM post" +
"LIMIT ? OFFSET ?;";