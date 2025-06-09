import { IUserAccount } from "../db/IAccount";
import { IUser } from "../db/IUser";
import { IVaccine } from "../db/IVaccine";
import { IVaccineRecommendation } from "../requests/IVaccineRecommendation";

export interface IUserSessionState{
    activeAccount: IUserAccount | null;
    activeUser: IUser | null;
}

export interface IUserSessionAction {
  switchAccount: (activeAccount: IUserSessionState["activeAccount"]) => void;
  switchUser: (activeUser: IUserSessionState["activeUser"]) => void;
}

export interface IVaccineListState{
    vaccineList: IVaccine[];
}

export interface IVaccineListAction{
    setVaccineList: (vaccines: IVaccineListState['vaccineList']) => void;
}

export interface IUserLocationState{
    latitude: string | null;
    longtitude: string | null;
}

export interface IUserLocationAction{
    setUserLocation: (latitude: IUserLocationState['latitude'], longtitude: IUserLocationState['longtitude']) => void;
}

export interface IRecommendedVaccineState{
    recommendedList: IVaccineRecommendation[];
}

export interface IRecommendedVaccineAction{
    setRecommendedList: (recommendedList: IRecommendedVaccineState['recommendedList']) => void;
}
