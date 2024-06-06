import request from "@/utils/request.ts";


export function getDanMuApi(videoId: string) {
    return request.get<any>(`/danmu/get?videoId=${videoId}`);
}

export interface DanMuAdd {
    videoId: number;
    userId: number;
    detail: string;
    time: number;
    createTime:string;
}

export function addDanMuApi(danmu: DanMuAdd) {
    return request.post<any>(`/danmu/add`, {
        ...danmu
    });
}

export function removeDanMuApi(id: number) {
    return request.get<any>(`/danmu/delete?id=${id}`)
}