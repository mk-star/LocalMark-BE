// 로컬레터 목록 조회
export const getLetterList = `
SELECT
    id as letter_id,
    category,
    title,
    thumbnail_url,
    created_date
FROM letter;
`

// 로컬레터 상세 조회
export const getLetterInfo = `
SELECT
    id as letter_id,
    category,
    title,
    thumbnail_url,
    created_date,
    content
FROM letter
WHERE id = ?;
`

// 이벤트 목록 조회
export const getEventList = `
SELECT
    e.id as event_id,
    e.region_id,
    r.name as region_name,
    e.title,
    e.thumbnail_url,
    e.created_date,
    e.start_date,
    e.end_date
FROM event e
JOIN region r on r.id = e.region_id;
`

// 이벤트 목록 조회 (지역 필터링)
export const getEventListByRegion = `
SELECT
    e.id as event_id,
    e.region_id,
    r.name as region_name,
    e.title,
    e.thumbnail_url,
    e.created_date,
    e.start_date,
    e.end_date
FROM event e
JOIN region r on r.id = e.region_id
WHERE r.id = ?;
`

// 이벤트 상세 조회
export const getEventInfo = `
SELECT
    e.id as event_id,
    e.region_id,
    r.name as region_name,
    e.title,
    e.thumbnail_url,
    e.created_date,
    e.start_date,
    e.end_date,
    e.content
FROM event e
JOIN region r on r.id = e.region_id
WHERE e.id = ?;
`