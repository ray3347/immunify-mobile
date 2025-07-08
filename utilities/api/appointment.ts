import HttpService from "../../constants/HttpService";
import { IApiResult, IBookingRes } from "../../interfaces/api";
import { IUserAccount } from "../../interfaces/db/IAccount";
import { IBookAppointmentRequestDTO } from "../../interfaces/requests/IBookAppointmentRequestDTO";

export const bookAppointment = async (accountId: string, dto: IBookAppointmentRequestDTO) =>{
    try{
        const requestBody = {
            dto: dto
        }
        const res: IApiResult<IBookingRes> = await HttpService.post(`/appointment/book?accountId=${accountId}`, requestBody);
        return res.data.data;

    }
    catch(ex){
        throw ex;
    }
}

export const getClinicAvailableTime = async (clinicId: string, selectedDate: string) => {
    try{
        const res: IApiResult<string[]> = await HttpService.get(`/appointment/get/available/time?clinicId=${clinicId}&selectedDate=${selectedDate}`);
        return res.data.data;
    }
    catch(ex){
        throw ex;
    }
}