import {IUser} from "./index";

export interface IWallet {
    id?: number;
    user_id?: number;
    balance?: number;


    user?: IUser;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export const commonRouterName = {
    qrcodeLogin: 'qrcodeLogin',
};


export const mobileRouterName = {
    h5: 'h5',
    h5Room: 'h5Room',
    h5Area: 'h5Area',
    h5Rank: 'h5Rank',
    h5Profile: 'h5Profile',
    ...commonRouterName,
};