import request from "@/utils/request.ts";


export interface History {
    id?: number;
    videoType?: string;
    url?: string;
    title?: string;
    recordTime: string;
    uid: string;
    //单位s
    watched: number;
    videoId: string;
    coverUrl: string;
    //发布者头像
    authorAvatar: string;
    authorName: string;
    //发布者主页
    authorLink?: string;
    isMobile?: string;
}

//添加是自动添加的
/**
 * 播放完成之后更新历史记录
 * @param params
 */
export function updateHistoryApi(params: History) {
    return request.post<any>("/history/update", {
        ...params
    })
}

interface HistoryParam {
    page: number;
    size: number;
    uid: number;
}

export function getHistoryApi({page, size, uid}: HistoryParam) {
    return request.get(`/history/page?page=${page}&size=${size}&uid=${uid}`)
}