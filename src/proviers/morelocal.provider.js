import { status } from "../../config/response.status.js";
import { letterlistResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters } from "../models/morelocal.dao.js";

// 로컬레터 목록 조회
export const getLetterLists = async () => {
    return letterlistResponseDTO(await getLetters());
}