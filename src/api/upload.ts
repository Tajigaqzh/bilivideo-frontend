import request from "@/utils/request.ts";
import {VideoType} from "@/store/typeStore.ts";


export interface SimpleUploadParam {
    file: File | Blob,
    prev: string;
}

export const simpleUploadApi = (param: SimpleUploadParam) => {
    const data = new FormData();

    data.append("file", param.file);

    data.append("prev", param.prev);

    return request.post<any>("/upload/simple", {file: param.file, prev: param.prev}, {
        headers: {
            'Content-Type': "multipart/form-data;charset=UTF-8"
        }
    })
}


export interface VideoParam {
    md5: string;
    packet: any;
    index: number;
    total: number;
}

export interface UploadInterface {
    code: number;
    data: string;
}

/**
 * formData
 * @param formData
 */
export const videoUpload = (formData: FormData) => {
    return request.post<UploadInterface>("/upload/part", formData, {
        timeout: 6000
    })
}

export interface ExistResult {
    code: number;
    data?: string;
}

export const checkMd5Api = (md5: string) => {
    return request.get<ExistResult>("/upload/check", {md5: md5})
}

export const transfer = (file: File, md5: string) => {
    const formData = new FormData();
    formData.append("md5", md5);
    formData.append("file", file);
    return request.post("/upload/transfer", formData, {
        timeout: 6000
    })
}

export interface TypeResult {
    code: number;
    data: Array<VideoType>;
}

export const videoTypeApi = () => {
    return request.get<TypeResult>("/video/type")
}



export interface User {
    avatar: string;
    coin: number;
    id: number;
    deleteStatus: number;
    mobile: number;
    level: number;
    sex: number;
    username: string;
    nickname: string;
}

export interface UserResult {
    code: number;
    data: Array<User>;
}

export const getUserByUsernameApi = (username: string) => {
    return request.get<UserResult>(`/user/username?username=${username}`)
}

export interface Author {
    id: number;
    name: string;
}

export interface Video {
    title: string;
    authors: Array<Author>;
    groupId?: number;
    keyWord: string;
    typeName: string;
    description: string;
    cover: string;
    length: number
    url: string;
}

export interface UserSaveResult {
    code: number;
}

export const videoSaveApi = (video: Video) => {
    return request.post<UserSaveResult>("/video/add", {
        ...video
    })
}
