// 브랜드 정보 조회
export const getBrandInfo = `
SELECT
    b.id as brand_id,
    r.region_name,
    b.brand_name,
    b.description,
    b.brand_url,
    b.brand_image
FROM Brand b
JOIN Region r on r.id = b.region_id
WHERE b.id = ?;
`

// 브랜드 존재 유무 확인
export const confirmBrand = `
SELECT
    EXISTS(SELECT 1 FROM Brand WHERE id = ?)
        as isExistBrand;
`

// 브랜드 프로필 - 제품 개수
export const getProductCnt = `
SELECT
    count(*) as product_cnt
FROM Product p
JOIN Brand b on b.id = p.brand_id
JOIN Subregion s on s.id = p.subregion_id
WHERE b.id = ? AND p.status = 'SELL';
`

// 브랜드 프로필 - 제품 갤러리
export const getBrandGallery = `
SELECT
    p.id as product_id,
    s.subregion_name,
    b.brand_name,
    p.product_name,
    p.discount_rate,
    p.price,
    p.thumbnail_url
FROM Product p
JOIN Brand b on b.id = p.brand_id
JOIN Subregion s on s.id = p.subregion_id
WHERE b.id = ? AND p.status = 'SELL'
`