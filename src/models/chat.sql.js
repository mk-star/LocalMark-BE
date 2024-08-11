export const  insertNewRoom = `
INSERT INTO ChatRoom (consumer, manager) VALUES (1, 2);
`

export const getRoomAll= `
    SELECT
        cr.id AS room_id,
        LEFT(m.content, 50) AS recentMessage,
        m.sender_id AS recentMessageSenderId,
        unreadCounts.unreadMessageCount
    FROM
        ChatRoom cr
        JOIN
        (SELECT room_id, content, timestamp,sender_id
        FROM Message
        WHERE (room_id, timestamp) IN (SELECT room_id, MAX(timestamp) FROM Message GROUP BY room_id)
        ) m
    ON
        cr.id = m.room_id
        LEFT JOIN
        (SELECT
        room_id,
        COUNT(id) AS unreadMessageCount
        FROM
        Message
        WHERE
        isRead = FALSE
        GROUP BY
        room_id
        ) unreadCounts
        ON
        cr.id = unreadCounts.room_id
    WHERE
        cr.consumer = ? OR cr.manager = ?;
`

export const getMessageAll =`
    SELECT
        id,
        sender_id,
        content,
        timestamp
    FROM
        Message
    WHERE
        room_id = ?  
    ORDER BY
        timestamp ASC;  
`
export const insertNewMessage= `
INSERT INTO Message (room_id, sender_id, content) VALUES (?, ?, ?)`