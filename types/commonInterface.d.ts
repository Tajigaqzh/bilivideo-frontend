import {IUser} from "./index";

export enum DanMuMsgTypeEnum {
    danMu,
    otherJoin,
    userLeaved,
    system,
    redBag,
    reward,
}

export interface ILiveUser {
    // id: string;
    // rooms?: string[];
    // userInfo?: IUser;
    created_at: string;
    value: {
        socketId: string;
        joinRoomId: number;
        userInfo?: IUser;
    };
}
