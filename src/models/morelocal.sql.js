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
