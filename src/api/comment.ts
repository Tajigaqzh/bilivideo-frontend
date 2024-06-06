import request from "@/utils/request.ts";

export interface Comment {
    id?: number;
    ipRegion?: string;
    videoId: number;
    // 是否是置顶，默认0不置顶
    isTop: number;
    content: string;
    publishName: string;
    // 发布人头像图片链接
    avatarImg: string;
    //发起人主页链接
    avatarLink: string;
    //发起人会员等级
    publishLevel: number;
    //发布时间
    publishTime: string;
    //父亲评论id
    parentId?: number;
    agreeNumber: number;
    disagreeNumber: number;
}

/**
 * 添加comment
 * @param comment
 */
export function addVideoCommentApi(comment: Comment) {
    return request.post("/comment/add", {
        ...comment
    })
}

export interface DeleteComment {
    ids: [],
    videoId: number;
}

export function deleteCommentApi(params: DeleteComment) {
    return request.post<any>("/comment/delete", {
        ...params
    })
}

export interface UpdateComment {
    id: number;
    agree?: boolean;
    disagree?: boolean;
}

/**
 * 对评论取消点赞或者取消不点赞
 * @param params
 */
export function agreeCommentOrDisagreeApi(params: UpdateComment) {
    return req.post<any>("/comment/update", {
        ...params
    })
}


