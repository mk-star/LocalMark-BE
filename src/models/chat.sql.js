export const  insertNewRoom = `
INSERT INTO ChatRoom (consumer, manager) VALUES (1, 2);
`

export const getRoomList= `

`

export const getMessageList =`

`
export const insertNewMessage= `
INSERT INTO message (roomId, senderId, message) VALUES (?, ?, ?)`