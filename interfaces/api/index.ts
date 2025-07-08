import { IUserAccount } from "../db/IAccount";

export interface IApiResult<T>{
    data: {
        data:T;
    };
}

export interface IBookingRes{
    appointmentId: string;
    dto: IUserAccount;
}