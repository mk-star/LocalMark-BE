// 갤러리 총 개수
export const getGalleryCnt = `
SELECT
    COUNT(*) AS products_cnt
FROM Product p
    JOIN Brand b on b.id = p.brand_id
    JOIN Region r on r.id = b.region_id
    JOIN Category c on p.category_id = c.id
    JOIN Subregion s on s.id = p.subregion_id
`

// 갤러리 제품 목록 보기
export const getGalleryList = `
SELECT
    p.id as product_id,
    b.id as brand_id,
    p.product_name,
    b.brand_name,
    s.subregion_name,
    r.region_name,
    p.discount_rate,
    p.price,
    p.thumbnail_url
FROM Product p
    JOIN Brand b on b.id = p.brand_id
    JOIN Region r on r.id = b.region_id
    JOIN Category c on p.category_id = c.id
    JOIN Subregion s on s.id = p.subregion_id
`

// 제품 상세 페이지 조회
export const getProductInfo = `
SELECT
    p.id as product_id,
    b.id as brand_id,
    p.name as product_name,
    b.name as brand_name,
    r.name as region,
    p.price,
    p.discount_rate,
    p.delivery_fee,
    p.description
FROM product p
    JOIN brand b on b.id = p.brand_id
    JOIN region r on r.id = b.region_id
WHERE p.id = ?;
`

// 제품 상세 페이지 색상 목록
export const getProductColor = `
SELECT
    c.name
FROM color c
JOIN product p on p.id = c.product_id
WHERE p.id = ?;
`

// 제품 상세 페이지 사이즈 목록
export const getProductSize = `
SELECT
    s.size
FROM size s
JOIN product p on p.id = s.product_id
WHERE p.id = ?;
`