import { pool } from "../../config/db.config.js";
import { getBrandInfo, confirmBrand, getBrandGallery, getProductCnt } from "./brand.sql.js";

// 브랜드 정보 조회
export const getBrandInfos = async (brandId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmBrand, brandId);
        if (!confirm[0].isExistBrand) {
          conn.release();
          return -1;
        }

        const brand = await pool.query(getBrandInfo, brandId);
        
        conn.release();
        return brand[0];
    } catch (err) {
        throw new Error(err.message)
    }
}

// 브랜드 프로필 - 제품 갤러리
export const getBrandGalleryList = async (brandId, page, sort) => {
    try {
        const conn = await pool.getConnection();

        // 페이징 처리
        const [ totalProductCnt ] = await pool.query(getProductCnt, brandId);
        let totalPage = 0;
        if (parseInt(totalProductCnt[0].product_cnt) < 16){
            totalPage = 1;
        }
        else if (totalProductCnt[0].products_cnt % 16 > 0){
            totalPage = parseInt(totalProductCnt[0].product_cnt / 16) + 1;
        } else {
            totalPage = parseInt(totalProductCnt[0].product_cnt / 16);
        }
        const offset = (parseInt(page) - 1) * 16;

        // 정렬 순서
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

        const brandQuery = `${getBrandGallery} ORDER BY ${sortKeyword} LIMIT 16 OFFSET ${offset};`;
        const [products] = await pool.query(brandQuery, brandId);
        
        conn.release();
        return {"products": products, "currentPage": parseInt(page), totalPage};
    } catch (err) {
        throw new Error(err.message)
    }
}