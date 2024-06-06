import request from "@/utils/request.ts";

export interface VideoAuthor {
    avatar: string;
    deleteStatus: number;
    id: number;
    nickname: string;
    sex: number;
}

export interface VideoItem {
    id: number;
    cover: string;
    deleteStatus: number;
    publisher: Array<VideoAuthor>;
    title: string;
    typeName: string;
    url: string;
}

interface VideoPage {
    code: number;
    data: {
        current: number;
        data?: Array<VideoItem>,
        total: number;
    }
}

export function getVideoPageApi(
    {page, size}: {
        page: number,
        size: number;
    }) {
    return request.get<VideoPage>(`/video/pageSimple?page=${page}&size=${size}`)
}

export interface VideoDetail {
    coin: number;
    collect: number;
    comment: []
    cover: string;
    createTime: string;
    deleteStatus: number;
    description: string;
    id: number;
    keyWord: string;
    length: number;
    likeNumber: number;
    playTimes: number;
    publisher: []
    title: string;
    transmit: number;
    typeName: string;
    url: string;
    watching: number;
}

interface VideoDetailResult {
    code: number;
    data: VideoDetail;
}

export function getVideoDetailApi(id: string) {
    return request.get<VideoDetailResult>(`/video/detail?id=${id}`)
}
export function zanVideoApi({videoId, zan}: {
    videoId: number,
    zan: boolean;
}) {
    return req.post<any>("/video/zan", {
        videoId: videoId,
        zan: zan
    })
}
