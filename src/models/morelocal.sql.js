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