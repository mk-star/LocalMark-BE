import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { letterlistResponseDTO, letterResponseDTO, recentLetterResponseDTO, eventlistResponseDTO, eventResponseDTO, recentEventResponseDTO, addLetterResponseDTO, modifyLetterResponseDTO } from "../dtos/morelocal.dto.js";
import { getLetters, getLetterDetail, getRecentLetters, getEvents, getEventDetail, getRecentEvents, addLetter, addLetterImage, updateLetterImages, modifyLetterById } from "../models/morelocal.dao.js";

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
    try {
      await modifyLetterById({
        letterId: letterId,
        title: body.title,
        content: body.content,
        category: body.category,
      }, imageKey);
  
      await updateLetterImages(letterId, imageKey);
  
      const {letter, images} = await getLetter(letterId);
      return modifyLetterResponseDTO(letter, images);
    } catch (err) {
      throw err;
    }
  };