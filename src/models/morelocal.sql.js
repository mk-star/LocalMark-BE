// 로컬레터 목록 조회
export const getLetterList = `
SELECT
    id as letter_id,
    category,
    title,
    thumbnail_url,
    created_at
FROM Letter
ORDER BY created_at DESC;
`

// 로컬레터 존재 유무 확인
export const confirmLetter = `
SELECT
    EXISTS(SELECT 1 FROM Letter WHERE id = ?)
        as isExistLetter;
`

// 로컬레터 상세 조회
export const getLetterInfo = `
SELECT
    id as letter_id,
    category,
    title,
    thumbnail_url,
    created_at,
    content
FROM Letter
WHERE id = ?;
`

// 로컬레터 상세 조회 - 이미지
export const getLetterInfoImage = `
SELECT
    filename
FROM Letter_Image
WHERE letter_id = ?;
`

// 로컬레터 최근 업데이트글 6개
export const recentLetters = `
SELECT
    id as letter_id,
    title,
    thumbnail_url
FROM Letter
ORDER BY
    created_at DESC
Limit 6;
`

// 이벤트 목록 조회
export const getEventList = `
SELECT
    e.id as event_id,
    s.subregion_name,
    e.title,
    e.thumbnail_url,
    e.created_at,
    e.start_date,
    e.end_date
FROM Event e
JOIN Subregion s on s.id = e.subregion_id
ORDER BY created_at DESC;
`

// 이벤트 존재 유무 확인
export const confirmEvent = `
SELECT
    EXISTS(SELECT 1 FROM Event WHERE id = ?)
        as isExistEvent;
`

// 이벤트 상세 조회
export const getEventInfo = `
SELECT
    e.id as event_id,
    s.subregion_name,
    e.title,
    e.thumbnail_url,
    e.created_at,
    e.start_date,
    e.end_date,
    e.content
FROM Event e
JOIN Subregion s on s.id = e.subregion_id
WHERE e.id = ?;
`

// 로컬레터 상세 조회 - 이미지
export const getEventInfoImage = `
SELECT
    filename
FROM Event_Image
WHERE event_id = ?;
`

// 이벤트 최근 업데이트글 6개
export const recentEvents = `
SELECT
    id as event_id,
    title,
    thumbnail_url
FROM Event
ORDER BY
    created_at DESC
Limit 6;
`

// 로컬레터 생성
export const insertLetter = `
INSERT INTO Letter (admin_id, title, thumbnail_url, content, category) VALUES (1, ?, ?, ?, ?);
`

// 로컬레터 생성 - 사진
export const insertLetterImage = `
INSERT INTO Letter_Image (letter_id, filename) VALUES ?;
`

// 로컬레터 수정
export const updateLetter = `
UPDATE Letter SET title = ?, thumbnail_url = ?, content = ?, category = ? WHERE id = ?
`

// 로컬레터 해당 letterId의 사진 선택
export const selectLetterImage = `
SELECT * FROM Letter_Image WHERE letter_id = ?
`

// 로컬레터 해당 letterId의 사진 삭제
export const deleteLetterImage = `
DELETE FROM Letter_Image WHERE letter_id = ?
`