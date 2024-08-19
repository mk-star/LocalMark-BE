// 로컬레터 목록 조회
export const letterlistResponseDTO = (data) => {

    const letters = [];

    for (let i = 0; i < data.length; i++) {
        letters.push({
            "letter_id": data[i].letter_id,
            "category": data[i].category,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url,
            "created_at": formatDate(data[i].created_at)
        })
    }

    return {"letters": letters};
}

// 로컬레터 상세 조회
export const letterResponseDTO = (letter, images) => {

    letter[0].created_at = formatDate(letter[0].created_at)

    return {"letter": letter[0], images};
}

// 로컬레터 최근 업데이트글 6개
export const recentLetterResponseDTO = (data) => {
    const letters = [];

    for (let i = 0; i < data.length; i++) {
        letters.push({
            "letter_id": data[i].letter_id,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url
        })
    }

    return {"letters": letters};
}

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2); 
    return `${year}.${month}.${day}`;
}

// 이벤트 목록 조회
export const eventlistResponseDTO = (data) => {

    const events = [];

    for (let i = 0; i < data.length; i++) {
        events.push({
            "event_id": data[i].event_id,
            "subregion_name": data[i].subregion_name,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url,
            "created_at": formatDate(data[i].created_at),
            "start_date": formatDate(data[i].start_date),
            "end_date": formatDate(data[i].end_date)
        })
    }

    return {"events": events};
}

// 이벤트 상세 조회
export const eventResponseDTO = (event, images) => {

    event[0].created_at = formatDate(event[0].created_at)
    event[0].start_date = formatDate(event[0].start_date)
    event[0].end_date = formatDate(event[0].end_date)

    return {"event": event[0], images};
}

// 이벤트 최근 업데이트글 6개
export const recentEventResponseDTO = (data) => {
    const events = [];

    for (let i = 0; i < data.length; i++) {
        events.push({
            "event_id": data[i].event_id,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url
        })
    }

    return {"events": events};
}

// 로컬레터 생성
export const addLetterResponseDTO = (letter, images) => {
    return {"letter" : letter, "images" : images};
}