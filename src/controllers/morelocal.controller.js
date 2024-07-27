import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getLetterLists, getLetter, getEventLists, getEvent } from "../proviers/morelocal.provider.js";

// 로컬레터 목록 조회
export const letterList = async (req, res, next) => {
    console.log("로컬 레터 목록을 요청하였습니다!");

    return res.send(response(status.SUCCESS, await getLetterLists(req.query.regionId)));
}

// 로컬레터 상세 조회
export const letterInfo = async (req, res, next) => {
    console.log("로컬 레터 상세 조회를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getLetter(req.params.letterId)));
}

// 이벤트 목록 조회
export const eventList = async (req, res, next) => {
    console.log("로컬 레터 목록을 요청하였습니다!");
    console.log("query:", req.query); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getEventLists(req.query.regionId)));
}

// 이벤트 상세 조회
export const eventInfo = async (req, res, next) => {
    console.log("이벤트 상세 조회를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getEvent(req.params.eventId)));
}