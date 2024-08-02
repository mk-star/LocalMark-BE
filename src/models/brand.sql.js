// 브랜드 정보 조회
export const getBrandInfo = `
SELECT
    b.id as brand_id,
    r.region_name,
    b.brand_name,
    b.description,
    b.brand_url,
    b.brand_image
FROM brand b
JOIN region r on r.id = b.region_id
WHERE b.id = ?;
`
