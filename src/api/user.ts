import request from "@/utils/request.ts";


export interface LoginParam {
    username: string;
    password: string;
    phone?: number;
    type: number
}

export interface LoginResult {
    code: number;
    message?: string;
}

export const loginByPassword = ({username, password}: LoginParam) => {
    return request.post<LoginResult>("/user/login", {
        username,
        password,
        type: 1
    })
}

export interface InfoResult {
    code: number;
    data: {
        username: string,
        nickname: string,
        id: number,
        avatar: string,
        sex: number,
        coin: number,
        roles: []
    }
}

export const getInfo = () => {
    return request.get<InfoResult>("/user/info")
}

type putParams = {
    putId: number,
    videoId: number,
    coin: number
}

export const touBiApi = (params: putParams) => {
    return request.post("/user/putCoin", {
        ...params
    })
}


export const loginOutApi = () => {
    return request.post("/user/logout")
}