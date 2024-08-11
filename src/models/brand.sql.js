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

// 내 브랜드 주문 수집
export const getBrandOrder = `
SELECT
    o.id as id,
    o.order_date,
    o.id as order_number,
    p.product_name,
    poc.product_option_combination,
    oi.quantity,
    o.total_price,
    o.receiver,
    o.phone,
    o.zip_code,
    o.address,
    o.spec_address
FROM Order_Item oi
JOIN Orders o on o.id = oi.order_id
JOIN Product_Option_Comb poc on poc.id = oi.product_option_id
JOIN Product p on p.id = oi.product_id
JOIN Brand b on b.id = p.brand_id
JOIN User u on u.id = b.user_id
WHERE u.id = ?;
`

// 내 브랜드 주문 수집 전 크리에이터 유무 확인
export const confirmCreator = `
SELECT
    CASE
        WHEN type = 'creator' THEN 1
        ELSE 0
    END AS isCreator
FROM User
WHERE id = ?;
`