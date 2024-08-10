import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getGalleryCnt, getGalleryList, getProductInfo, getProductImage, getProductReviewInfo, getProductOptionInfo, confirmRegion, confirmCategory, confirmProduct } from "./gallery.sql.js";

// 제품 갤러리 목록 조회/검색
export const getGellery = async (regionId, categoryId, page, sort, keyword) => {

    try {
        
        const conn = await pool.getConnection();
                
        // // 정렬 순서
        let sortKeyword = 'views DESC'; // 기본은 조회순
        if(sort != "undefined" && typeof sort != "undefined" && sort != null){ 
            if (sort == 1){ // 가격 낮은 순
                sortKeyword = 'price'; 
            } else if (sort == 2){  // 가격 높은 순
                sortKeyword = 'price DESC'; 
            } else if (sort == 3){  // 인기순(판매량 많은 순)
                sortKeyword = 'sales_count DESC';
            }
        }

        const regionExist = (regionId != "undefined" && typeof regionId != "undefined" && regionId != null);
        const categoryExist = (categoryId != "undefined" && typeof categoryId != "undefined" && categoryId != null);

        // 존재하지 않는 지역
        if(regionExist){
            const [confirmR] = await pool.query(confirmRegion, regionId);
            if (!confirmR[0].isExistRegion) {
                conn.release();
                return -1;
            }
        }

        // 존재하지 않는 카테고리
        if(categoryExist){
            const [confirmC] = await pool.query(confirmCategory, categoryId);
            if (!confirmC[0].isExistCategory) {
                conn.release();
                return -2;
            }
        }

        let galleryListQuery;
        let galleryCntQuery;
        const offset = (parseInt(page) - 1) * 12;
        let totalProductCnt = [];
        let products = [];

        // 키워드 없을 경우
        if(keyword == "undefined" || typeof keyword == "undefined" || keyword == null){
            if(regionExist && categoryExist){  // 지역O, 카테고리O
                galleryListQuery = `${getGalleryList} WHERE r.id = ? AND c.id = ? ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt} WHERE r.id = ? AND c.id = ?;`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(regionId), parseInt(categoryId)]);
                [products] = await pool.query(galleryListQuery, [parseInt(regionId), parseInt(categoryId)]);
            } else if (regionExist && !categoryExist){ // 지역O, 카테고리x
                galleryListQuery = `${getGalleryList} WHERE r.id = ? ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;    
                galleryCntQuery = `${getGalleryCnt} WHERE r.id = ?;`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(regionId)]);
                [products] = await pool.query(galleryListQuery, [parseInt(regionId)]);
            } else if (!regionExist && categoryExist){  // 지역x, 카테고리o
                galleryListQuery = `${getGalleryList} WHERE c.id = ? ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt} WHERE c.id = ?;`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(categoryId)]);
                [products] = await pool.query(galleryListQuery, [parseInt(categoryId)]);
            } else {  // 지역x, 카테고리x
                galleryListQuery = `${getGalleryList} ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt};`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery);
                [products] = await pool.query(galleryListQuery);
            }
        }else{  // 키워드 있을 경우
            const keywordPattern = `%${keyword}%`;
            if(regionExist && categoryExist){  // 지역O, 카테고리O
                galleryListQuery = `${getGalleryList} WHERE r.id = ? AND c.id = ? 
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? ) 
                ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt} WHERE r.id = ? AND c.id = ?
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? );`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(regionId), parseInt(categoryId), keywordPattern, keywordPattern]);
                [products] = await pool.query(galleryListQuery, [parseInt(regionId), parseInt(categoryId), keywordPattern, keywordPattern]);
            } else if (regionExist && !categoryExist){ // 지역O, 카테고리x
                galleryListQuery = `${getGalleryList} WHERE r.id = ? 
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? ) 
                ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;    
                galleryCntQuery = `${getGalleryCnt} WHERE r.id = ?
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? );`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(regionId), keywordPattern, keywordPattern]);
                [products] = await pool.query(galleryListQuery, [parseInt(regionId), keywordPattern, keywordPattern]);
            } else if (!regionExist && categoryExist){  // 지역x, 카테고리o
                galleryListQuery = `${getGalleryList} WHERE c.id = ? 
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? ) 
                ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt} WHERE c.id = ? 
                AND (s.subregion_name LIKE ? OR p.product_name LIKE ? );`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [parseInt(categoryId), keywordPattern, keywordPattern]);
                [products] = await pool.query(galleryListQuery, [parseInt(categoryId), keywordPattern, keywordPattern]);
            } else {  // 지역x, 카테고리x
                galleryListQuery = `${getGalleryList}
                WHERE (s.subregion_name LIKE ? OR p.product_name LIKE ? ) 
                ORDER BY ${sortKeyword} LIMIT 12 OFFSET ${offset};`;
                galleryCntQuery = `${getGalleryCnt}
                WHERE (s.subregion_name LIKE ? OR p.product_name LIKE ? ) ;`;
                [ totalProductCnt ] = await pool.query(galleryCntQuery, [keywordPattern, keywordPattern]);
                [products] = await pool.query(galleryListQuery, [keywordPattern, keywordPattern]);
            }   
        }
            
        // 총 페이지 계산
        let totalPage;
        if (totalProductCnt[0].products_cnt <= 12){
            totalPage = 1;
        } else if (totalProductCnt[0].products_cnt % 12 > 0){
            totalPage = parseInt(totalProductCnt[0].products_cnt / 12) + 1;
        } else {
            totalPage = parseInt(totalProductCnt[0].products_cnt / 12);
        }

        conn.release();
        return {products, "currentPage": parseInt(page), totalPage};
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG);
    }
}

// 제품 상세 페이지 조회
export const getProduct = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(getProductInfo, productId);
        const [images] = await pool.query(getProductImage, productId);
        const [review] = await pool.query(getProductReviewInfo, productId);
        const [options] = await pool.query(getProductOptionInfo, productId);
        
        const [confirmP] = await pool.query(confirmProduct, productId);
        if (!confirmP[0].isExistProduct) {
            conn.release();
            return -1;
        }

        const imageUrls = images.map(image => image.image_url);
        product[0].star_avg = review[0]?.avgStar ? parseFloat(review[0].avgStar).toFixed(1) : "0.0";
        product[0].review_cnt = review[0]?.reviewCnt ?? 0;

        const transformedOptions = options.map(option => {
            const optionParts = option.option_type.split(', ');
            
            const optionTypeObj = optionParts.reduce((acc, part) => {
                const [key, value] = part.split(': ');
                acc[key.trim()] = value.trim();
                return acc;
            }, {});
            
            return {
                id: option.id,
                option_type: optionTypeObj,
                stock: option.stock
            };
        });

        conn.release();
        return {product: product[0], options: transformedOptions, images: imageUrls};
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}