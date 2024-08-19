export const insertTempUserSql = "INSERT INTO User(email, verification_token, token_expiration) VALUES (?, ?, ?)";

export const selectTempUserSql = "SELECT * FROM User WHERE verification_token = ?";

export const updateEmailStatus = "UPDATE User SET is_email_verified = 1 WHERE email = ?";

export const insertUserSql = "UPDATE User SET loginId = ?, password = ?, nickname = ?, type = ?, status = ? WHERE email = ?";

export const updateUserSql = "UPDATE User SET loginId = ?, email = ?, nickname = ? WHERE id = ?"

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM User WHERE email = ?) AS isExistEmail";

export const confirmLoginId = "SELECT EXISTS(SELECT 1 FROM User WHERE loginId = ?) AS isExistLoginId";

export const confirmNickname = "SELECT EXISTS(SELECT 1 FROM User WHERE nickname = ?) AS isExistNickname";

export const selectEmailVerification = "SELECT is_email_verified FROM User WHERE email = ?";

export const selectUserSql = "SELECT nickname, email FROM User WHERE loginId = ?";

export const updateActiveUserSql =
  "UPDATE User SET token = NULL, status = 'INACTIVE', inactive_date = NOW() WHERE id = ?";

export const updateInactiveUserSql =
  "UPDATE User SET status = 'ACTIVE', inactive_date = NULL WHERE id = ?";

export const deleteUserSql =
  "DELETE FROM User WHERE inactive_date IS NOT NULL AND inactive_date < NOW() - INTERVAL 7 DAY";

export const getUserInfo = `SELECT nickname, email FROM User WHERE id = ? `