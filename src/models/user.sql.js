export const confirmLoginId =
  "SELECT EXISTS(SELECT 1 FROM user WHERE loginId = ?) AS isExistLoginId";

export const selectUserSql =
  "SELECT id, loginId, password, type FROM user WHERE loginId = ?";

export const updateTokenSql = "UPDATE user SET token = ? WHERE id = ?";

export const confirmToken =
  "SELECT EXISTS(SELECT 1 FROM user WHERE id = ? AND token = ?) as isExistToken;";

export const getTokenSql = "SELECT token FROM user WHERE id = ?;";
