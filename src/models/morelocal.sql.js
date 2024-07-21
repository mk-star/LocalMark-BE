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