import HttpService from "../../constants/HttpService";
import { IApiResult } from "../../interfaces/api";
import { IUserAccount } from "../../interfaces/db/IAccount";

export const getUserById = async (accountId: string) => {
    try{
        const res : IApiResult<IUserAccount> = await HttpService.get(`/user/id?accountId=${accountId}`);
        return res.data.data;
    }
    catch(ex){
        throw ex;
    }
}