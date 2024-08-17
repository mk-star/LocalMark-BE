import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { letterlistResponseDTO, letterResponseDTO, recentLetterResponseDTO, eventlistResponseDTO, eventResponseDTO, recentEventResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters, getLetterDetail, getRecentLetters, getEvents, getEventDetail, getRecentEvents } from "../models/morelocal.dao.js";

// 로컬레터 목록 조회
export const getLetterLists = async () => {
    return letterlistResponseDTO(await getLetters());
}

// 로컬레터 상세 조회
export const getLetter = async (letterId) => {
    const result = await getLetterDetail(letterId);
    if (result == -1){
        throw new BaseError(status.LETTER_NOT_EXIST);
    } else {
        const {letter, images} = await getLetterDetail(letterId);
        return letterResponseDTO(letter, images);
    }
}

// 로컬레터 최근 업데이트글 6개
export const getRecentLetterList = async () => {
    return recentLetterResponseDTO(await getRecentLetters());
}

// 이벤트 목록 조회
export const getEventLists = async () => {
    return eventlistResponseDTO(await getEvents());
}

// 이벤트 상세 조회
export const getEvent = async (eventId) => {
    const result = await getEventDetail(eventId);
    if (result == -1){
        throw new BaseError(status.EVENT_NOT_EXIST);
    } else {
        const {event, images} = await getEventDetail(eventId);
        return eventResponseDTO(event, images);
    }
}

// 이벤트 최근 업데이트글 6개
export const getRecentEventList = async () => {
    return recentEventResponseDTO(await getRecentEvents());
}