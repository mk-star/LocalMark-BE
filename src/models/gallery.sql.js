// 갤러리 총 개수
export const getGalleryCnt = `
SELECT
    COUNT(*) AS products_cnt
FROM product p
    JOIN brand b on b.id = p.brand_id
    JOIN region r on r.id = b.region_id
    JOIN product_category pc on p.id = pc.product_id
WHERE r.id = ?
  AND pc.category_id = ?;`

// 갤러리 검색 총 개수
export const getGalleryByKeywordCnt = `
SELECT
    COUNT(*) AS products_cnt
FROM product p
    JOIN brand b on b.id = p.brand_id
    JOIN region r on r.id = b.region_id
    JOIN product_category pc on p.id = pc.product_id
WHERE r.id = ?
  AND pc.category_id = ?
  AND p.name LIKE ?;`

// 갤러리 제품 보기
export const getGalleryList = `
SELECT 
    p.id as product_id, 
    b.id as brand_id, 
    p.name as product_name, 
    b.name as brand_name, 
    r.name as region, 
    p.discount_rate, 
    p.price, 
    p.thumbnail_url 
FROM product p 
    JOIN brand b on b.id = p.brand_id 
    JOIN region r on r.id = b.region_id 
    JOIN product_category pc on p.id = pc.product_id 
WHERE r.id = ? 
  AND pc.category_id = ?
LIMIT ? OFFSET ?;`

// 갤러리 제품 이름 검색
export const getGalleryByKeyword = `
SELECT
    p.id as product_id,
    b.id as brand_id,
    p.name as product_name,
    b.name as brand_name,
    r.name as region,
    p.discount_rate,
    p.price,
    p.thumbnail_url
FROM product p
    JOIN brand b on b.id = p.brand_id
    JOIN region r on r.id = b.region_id
    JOIN product_category pc on p.id = pc.product_id
WHERE r.id = ?
  AND pc.category_id = ?
  AND p.name LIKE ?
LIMIT ? OFFSET ?;`