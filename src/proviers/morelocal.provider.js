import { status } from "../../config/response.status.js";
import { letterlistResponseDTO, letterResponseDTO, eventlistResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters, getLetterDetail, getEvents } from "../models/morelocal.dao.js";

// 로컬레터 목록 조회
export const getLetterLists = async () => {
    return letterlistResponseDTO(await getLetters());
}

// 로컬레터 상세 조회
export const getLetter = async (letterId) => {
    return letterResponseDTO(await getLetterDetail(letterId));
}

// 로컬레터 목록 조회
export const getEventLists = async (regionId) => {
    return eventlistResponseDTO(await getEvents(regionId));
}