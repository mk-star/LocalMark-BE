// 로컬레터 목록 조회
export const getLetterList = `
SELECT
    id as letter_id,
    category,
    title,
    thumbnail_url,
    created_at
FROM letter
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
FROM letter
WHERE id = ?;
`

// 로컬레터 최근 업데이트글 6개
export const recentLetters = `
SELECT
    id as letter_id,
    title,
    thumbnail_url
FROM letter
ORDER BY
    created_at DESC
Limit 6;
`

// 이벤트 목록 조회
export const getEventList = `
SELECT
    e.id as event_id,
    r.region_name,
    e.title,
    e.thumbnail_url,
    e.created_at,
    e.start_date,
    e.end_date
FROM event e
JOIN region r on r.id = e.region_id
ORDER BY created_at DESC;
`

// 이벤트 목록 조회 (지역 필터링)
export const getEventListByRegion = `
SELECT
    e.id as event_id,
    r.region_name,
    e.title,
    e.thumbnail_url,
    e.created_at,
    e.start_date,
    e.end_date
FROM event e
JOIN region r on r.id = e.region_id
WHERE r.id = ?
ORDER BY created_at DESC;
`

// 이벤트 상세 조회
export const getEventInfo = `
SELECT
    e.id as event_id,
    r.region_name,
    e.title,
    e.thumbnail_url,
    e.created_at,
    e.start_date,
    e.end_date,
    e.content
FROM event e
JOIN region r on r.id = e.region_id
WHERE e.id = ?;
`

// 이벤트 최근 업데이트글 6개
export const recentEvents = `
SELECT
    id as event_id,
    title,
    thumbnail_url
FROM event
ORDER BY
    created_at DESC
Limit 6;
`