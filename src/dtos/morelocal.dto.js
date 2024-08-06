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
export const letterResponseDTO = (data) => {

    data[0].created_at = formatDate(data[0].created_at)

    return {"letter": data[0]};
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
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}

// 이벤트 목록 조회
export const eventlistResponseDTO = (data) => {

    const events = [];

    for (let i = 0; i < data.length; i++) {
        events.push({
            "event_id": data[i].event_id,
            "region_name": data[i].region_name,
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
export const eventResponseDTO = (data) => {

    data[0].created_at = formatDate(data[0].created_at)
    data[0].start_date = formatDate(data[0].start_date)
    data[0].end_date = formatDate(data[0].end_date)

    return {"event": data[0]};
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