import { status } from "../../config/response.status.js";
import { getPosts } from "../providers/post.provider.js";
import { response } from "../../config/response.js";
import { 
        addPostInfo,
        createPost, 
        deletePostById, 
        getPostsByCreator, 
        updatePostDetail } from "../services/post.service.js";
import { removeImageById, uploadFileToS3AndSave } from "../services/image.service.js";


export const addPost = async(req,res,next)=>{
        // 업로드된 파일 목록을 파일 경로 배열로 변환
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        // postInfo 필드를 JSON으로 파싱
        const postInfo = JSON.parse(req.body.postInfo);
        const postData = {
                ...postInfo,
                images, // 파일 경로 배열 설정
        };
        return res.send(response(status.SUCCESS,await addPostInfo(postData)));
}


// 커뮤니티 게시글 전체 및 카테고리별 게시글 목록 조회
export const postsPreview = async(req,res) => {

        const querys = req.query;
        console.log(querys);

        const category = querys.category;
        console.log(category);
        const page = parseInt(querys.page, 10) || 1; // 페이지 번호 기본값 설정

        res.send(response(status.SUCCESS, await getPosts(category, page)));

}

export const uploadPost = async(req, res) => {

        try {
                console.log("body: ", req.body);
                const files = req.files;

                const postId = await createPost(req.body);
                
                const imageUrls = [];
                if (files && files.length > 0) {
                        for (const file of files) {
                                const filePath = path.join(file.destination, file.filename);
                                const imageUrl = await uploadFileToS3AndSave(postId, filePath);
                                imageUrls.push(imageUrl);

                                fs.unlinkSync(filePath);
                        }
                }

                res.send(response(status.SUCCESS, imageUrls));
                
        } catch (error) {
                throw new Error(`오류 발생: ${error.message}`);
        }

}

export const postDetail = async(req, res, next) => {
        
        console.log("게시글 상세 조회 요청");
        const params = req.params;
        console.log("params(postId): ", params);

        return res.send(response(status.SUCCESS, await getPostDetail(params)));

}

export const modifyPost = async(req, res) => {

        console.log("게시글 수정 요청");
        const params = req.params;
        console.log("params(postId): ", params);
        
        const postId = req.params.id;
        console.log("req.body: ", req.body);
        const {title, content, category, thumbnailId, deleteImageIds} = req.body;
        const newImages = req.files;

        try {
                // 1. 게시글 내용 업데이트
                await updatePostDetail({postId, title, content, category, thumbnailId});

                // 2. 삭제한 이미지 처리
                if (deleteImageIds && deleteImageIds.length > 0) {
                        for (const imageId of deleteImageIds) {
                            await removeImageById(imageId);
                        }
                }
                
                // 3. 새로 추가한 이미지 처리
                const newImageUrls = [];
                if (newImages && newImages.length > 0) {
                    for (const file of newImages) {
                        console.log("file.path: ", file.path);
                        const imageUrl = await uploadFileToS3AndSave(file.path, postId);
                        newImageUrls.push(imageUrl);
                    }
                }

                res.send(response(status.SUCCESS, newImageUrls));
                
        } catch (error) {
                throw new Error(`오류 발생: ${error.message}`);
        }

}

export const removePost = async(req, res) => {
        console.log("게시글 삭제 요청");
        const params = req.params;
        console.log("params(postId): ", params);

        return res.send(response(status.SUCCESS, await deletePostById(params)));
}


export const postsByCreator = async(req, res) => {
        console.log("크레이터의 게시글 조회 요청 ");
        
        return res.send(response(status.SUCCESS, await getPostsByCreatorService(req.params)));
}
