import request from "@/utils/request.ts";

export interface StartLiveParam {
    startId: number;
    roomId: string;
    roomTitle: string;
    sdp: string;
    typeTitle: string;
    roomCover?: string;
    roomDesc?: string;
    notice?: string;
}

interface PublishResult {
    code: number;
    data: {
        playUrl: string;
        sdp: string;
        roomId: string;
    }
}

/**
 * 发起直播
 * @param params
 */
export function startLiveApi(params: StartLiveParam) {
    return request.post<PublishResult>("/srs/publish", params);
}

// interface WatchingResult {
//     code: number;
//     data: number;
// }

/**
 * 查询观看人数
 * @param roomId
 */
// export function getWatching(roomId: string) {
//     return request.get(`/srs/watching?roomId=${roomId}`)
// }

interface StopResult {
    code: number;
}

/**
 * 停止直播
 * @param roomId
 */
export function stopLiveApi(roomId: string) {
    return request.post<StopResult>("/srs/stop", {
        roomId: roomId
    });
}

/**
 * 离开房间
 * @param roomId
 * @param userId
 */
export function leaveRoom(roomId: string, userId: string) {
    return request.get(`/srs/leave?roomId=${roomId}&userId=${userId}`)
}

export function getDetailApi(roomId: string) {
    return request.get<any>(`/srs/detail?roomId=${roomId}`)
}


export function getWatching(roomId: string) {
    return request.get<any>(`/srs/watching?roomId=${roomId}`)
}

export function getFirstRecommendApi(){
    return request.get<any>("/srs/random")
}