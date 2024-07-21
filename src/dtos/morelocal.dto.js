// 로컬레터 목록 조회
export const letterlistResponseDTO = (data) => {

    const letters = [];

    for (let i = 0; i < data.length; i++) {
        letters.push({
            "letter_id": data[i].letter_id,
            "category": data[i].category,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url,
            "created_date": formatDate(data[i].created_date)
        })
    }

    return {"letters": letters};
}

// 로컬레터 상세 조회
export const letterResponseDTO = (data) => {

    console.log("dto data", data[0]);
    data[0].created_date = formatDate(data[0].created_date)


    return {"letter": data[0]};
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
            "region_id": data[i].region_id,
            "region_name": data[i].region_name,
            "title": data[i].title,
            "thumbnail_url": data[i].thumbnail_url,
            "created_date": formatDate(data[i].created_date),
            "start_date": formatDate(data[i].start_date),
            "end_date": formatDate(data[i].end_date)
        })
    }

    return {"events": events};
}