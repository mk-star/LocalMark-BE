import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { letterlistResponseDTO, letterResponseDTO, recentLetterResponseDTO, eventlistResponseDTO, eventResponseDTO, recentEventResponseDTO, addLetterResponseDTO, modifyLetterResponseDTO, addEventResponseDTO, modifyEventResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters, getLetterDetail, getRecentLetters, getEvents, getEventDetail, getRecentEvents, addLetter, addLetterImage, updateLetterImages, modifyLetterById, deleteLetterById, addEvent, addEventImage, updateEventImages, modifyEventById, deleteEventById } from "../models/morelocal.dao.js";

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

// 로컬레터 생성
export const addLetterInfo = async (body, imagekey) => {
    try{
        const letterData = await addLetter({
            title: body.title, 
            content: body.content, 
            category: body.category
        }, imagekey);

        if(imagekey && imagekey.length > 0){
            await addLetterImage(letterData, imagekey);
        }
        const {letter, images} = await getLetter(letterData);
        return addLetterResponseDTO(letter, images);
    } catch(err){
        throw err;
    }
}

// 로컬레터 수정
export const modifyLetterInfo = async (letterId, body, imageKey) => {

    // 로컬레터 존재하는지 판별
    const result = await getLetterDetail(letterId);
    if (result == -1){
        throw new BaseError(status.LETTER_NOT_EXIST);
    }

    await modifyLetterById({
        letterId: letterId,
        title: body.title,
        content: body.content,
        category: body.category,
    }, imageKey);
  
    await updateLetterImages(letterId, imageKey);
  
    const {letter, images} = await getLetter(letterId);
    return modifyLetterResponseDTO(letter, images);
  };

// 로컬레터 삭제
export const removeLetter = async (letterId) => {
    const result = await deleteLetterById(letterId);
  
    if (result == -1) {
      throw new BaseError(status.LETTER_NOT_EXIST);
    }
  
    return "로컬레터가 성공적으로 삭제되었습니다.";
};
  
// 이벤트 생성
export const addEventInfo = async (body, imagekey) => {
    try{
        const eventData = await addEvent({
            title: body.title, 
            content: body.content, 
            start_date: body.start_date, 
            end_date: body.end_date,
            subregion_id: body.subregion_id
        }, imagekey);

        if(imagekey && imagekey.length > 0){
            await addEventImage(eventData, imagekey);
        }
        const {event, images} = await getEvent(eventData);
        return addEventResponseDTO(event, images);
    } catch(err){
        throw err;
    }
}

// 이벤트 수정
export const modifyEventInfo = async (eventId, body, imageKey) => {

    // 이벤트 존재하는지 판별
    const result = await getEventDetail(eventId);
    if (result == -1){
        throw new BaseError(status.EVENT_NOT_EXIST);
    }
    
    await modifyEventById({
        eventId: eventId,
        title: body.title,
        content: body.content,          
        start_date: body.start_date, 
        end_date: body.end_date, 
        subregion_id: body.subregion_id
    }, imageKey);
  
    await updateEventImages(eventId, imageKey);
  
    const {event, images} = await getEvent(eventId);
    return modifyEventResponseDTO(event, images);
};

// 이벤트 삭제
export const removeEvent = async (eventId) => {
    const result = await deleteEventById(eventId);
  
    if (result == -1) {
      throw new BaseError(status.EVENT_NOT_EXIST);
    }
  
    return "이벤트가 성공적으로 삭제되었습니다.";
};