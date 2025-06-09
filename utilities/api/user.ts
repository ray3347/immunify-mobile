import HttpService from "../../constants/HttpService";
import { IApiResult } from "../../interfaces/api";
import { IUserAccount } from "../../interfaces/db/IAccount";
import { IUser, IVaccinationHistory } from "../../interfaces/db/IUser";
import { IVaccineRecommendation } from "../../interfaces/requests/IVaccineRecommendation";

export const getUserById = async (accountId: string) => {
    try{
        const res : IApiResult<IUserAccount> = await HttpService.get(`/user/id?accountId=${accountId}`);
        return res.data.data;
    }
    catch(ex){
        throw ex;
    }
}

export const addUser = async (accountId: string, req: IUser) => {
    try{
        const requestBody = {
            accountId: accountId,
            dto: req
        }
        const res : IApiResult<IUserAccount> = await HttpService.post(`/user/entity/add`, requestBody);
        return res.data.data
    }
    catch(ex){
        throw ex;
    }
}

export const editUser = async (accountId: string, req: IUser) => {
    try{
        const requestBody = {
            accountId: accountId,
            dto: req
        }
        const res : IApiResult<IUserAccount> = await HttpService.post(`/user/entity/edit`, requestBody);
        return res.data.data

    }
    catch(ex){
        throw ex;
    }
}

export const deleteUser = async (accountId: string, req: string) => {
    try{
        const requestBody = {
            accountId: accountId,
            userId: req
        }
        const res : IApiResult<IUserAccount> = await HttpService.post(`/user/entity/delete`, requestBody);
        return res.data.data

    }
    catch(ex){
        throw ex;
    }
}

export const addVaccinationHistory = async (accountId: string, userId: string, dto: IVaccinationHistory) => {
    try{
        const requestBody = {
            dto: dto
        }
        const res : IApiResult<IUserAccount> = await HttpService.post(`/user/history/add?accountId=${accountId}&userId=${userId}`, requestBody);
        return res.data.data

    }
    catch(ex){
        throw ex;
    }
}

export const getRecommendedVaccines = async (accountId: string, userId: string) => {
    try{
        const res : IApiResult<IVaccineRecommendation[]> = await HttpService.get(`/user/vaccine/recommendation?accountId=${accountId}&userId=${userId}`);
        return res.data.data
    }
    catch(ex){
        throw ex;
    }
}