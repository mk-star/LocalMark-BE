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

// 제품 상세 페이지 조회 - 일반 상품 정보
export const getProductInfo = `
SELECT
    p.id as product_id,
    b.id as brand_id,
    p.product_name,
    b.brand_name,
    p.price,
    p.discount_rate,
    p.delivery_fee,
    p.description
FROM Product p
    JOIN Brand b on b.id = p.brand_id
WHERE p.id = ?;
`

// 제품 갤러리 상세 페이지 조회 - 이미지 
export const getProductImage = `
SELECT
    pi.filename as image_url
FROM Product_Image pi
JOIN Product p on p.id = pi.product_id
WHERE p.id = ?;
`

// 제품 갤러리 상세 페이지 조회 - 리뷰 정보(평점, 리뷰 개수)
export const getProductReviewInfo = `
SELECT
    AVG(r.rating) as avgStar,
    COUNT(r.id) as reviewCnt
FROM Product p
    JOIN Review r on p.id = r.product_id
WHERE p.id = ?;
`