export const  insertNewRoom = `
INSERT INTO ChatRoom (consumer, manager) VALUES (1, 2);
`

export const getRoomAll= `
    SELECT
        cr.id AS roomId,
        LEFT(m.message, 50) AS recentMessage,
        m.senderId AS recentMessageSenderId,
        unreadCounts.unreadMessageCount
    FROM
        chatRoom cr
        JOIN
        (SELECT
        roomId,
        message,
        timestamp,
        senderId
        FROM
        message
        WHERE
        (roomId, timestamp) IN (
        SELECT
        roomId, MAX(timestamp)
        FROM
        message
        GROUP BY
        roomId
        )
        ) m
    ON
        cr.id = m.roomId
        LEFT JOIN
        (SELECT
        roomId,
        COUNT(id) AS unreadMessageCount
        FROM
        message
        WHERE
        isRead = FALSE
        GROUP BY
        roomId
        ) unreadCounts
        ON
        cr.id = unreadCounts.roomId
    WHERE
        cr.consumer = ? OR cr.manager = ?;
`

export const getMessageAll =`
    SELECT
        id,
        senderId,
        message,
        timestamp
    FROM
        message
    WHERE
        roomId = ?  
    ORDER BY
        timestamp ASC;  
`
export const insertNewMessage= `
INSERT INTO message (roomId, senderId, message) VALUES (?, ?, ?)`