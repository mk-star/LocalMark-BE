import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getLetterLists, getLetter, getRecentLetterList, getEventLists, getEvent, getRecentEventList, addLetterInfo } from "../providers/morelocal.provider.js";

// 로컬레터 목록 조회
export const letterList = async (req, res, next) => {
    console.log("로컬 레터 목록을 요청하였습니다!");

    return res.send(response(status.SUCCESS, await getLetterLists()));
}

// 로컬레터 상세 조회
export const letterInfo = async (req, res, next) => {
    console.log("로컬 레터 상세 조회를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getLetter(req.params.letterId)));
}

// 로컬레터 최근 업데이트글 6개
export const recentLetters = async (req, res, next) => {
    console.log("로컬 레터 최근 업데이트 글 6개를 요청하였습니다!");
    
    return res.send(response(status.SUCCESS, await getRecentLetterList()));
}


// 이벤트 목록 조회
export const eventList = async (req, res, next) => {
    console.log("로컬 레터 목록을 요청하였습니다!");

    return res.send(response(status.SUCCESS, await getEventLists()));
}

// 이벤트 상세 조회
export const eventInfo = async (req, res, next) => {
    console.log("이벤트 상세 조회를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getEvent(req.params.eventId)));
}

// 이벤트 최근 업데이트글 6개
export const recentEvents = async (req, res, next) => {
    console.log("이벤트 최근 업데이트 글 6개를 요청하였습니다!");
    
    return res.send(response(status.SUCCESS, await getRecentEventList()));
}

// 로컬레터 생성
export const addNewLetter = async (req, res, next) => {
    console.log("로컬레터 생성을 요청하였습니다!");
    console.log("body", req.body);
    const reviewImage = req.files;
  
    const imageKey = [];
    if (reviewImage) {
      reviewImage.forEach((v) => {
        imageKey.push(v.location);
      });
    }
  
    res.send(
      response(
        status.SUCCESS,
        await addLetterInfo(req.body, imageKey)
      )
    );
  };