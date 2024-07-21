import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getLetterLists } from "../proviers/morelocal.provider.js";

// 
export const letterList = async (req, res, next) => {
    console.log("로컬 레터 목록을 요청하였습니다!");

    return res.send(response(status.SUCCESS, await getLetterLists()));
}