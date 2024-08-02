import { status } from "../../config/response.status.js";
import { letterlistResponseDTO, letterResponseDTO, recentLetterResponseDTO, eventlistResponseDTO, eventResponseDTO, recentEventResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters, getLetterDetail, getRecentLetters, getEvents, getEventDetail, getRecentEvents } from "../models/morelocal.dao.js";

// 로컬레터 목록 조회
export const getLetterLists = async (regionId) => {
    return letterlistResponseDTO(await getLetters());
}

// 로컬레터 상세 조회
export const getLetter = async (letterId) => {
    return letterResponseDTO(await getLetterDetail(letterId));
}

// 로컬레터 최근 업데이트글 6개
export const getRecentLetterList = async () => {
    return recentLetterResponseDTO(await getRecentLetters());
}

// 이벤트 목록 조회
export const getEventLists = async (regionId) => {
    return eventlistResponseDTO(await getEvents(regionId));
}

// 이벤트 상세 조회
export const getEvent = async (eventId) => {
    return eventResponseDTO(await getEventDetail(eventId));
}

// 이벤트 최근 업데이트글 6개
export const getRecentEventList = async () => {
    return recentEventResponseDTO(await getRecentEvents());
}