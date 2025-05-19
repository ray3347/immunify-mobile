import { IUserAccount } from "../db/IAccount";
import { IUser } from "../db/IUser";
import { IVaccine } from "../db/IVaccine";

export interface IUserSessionState{
    activeAccount: IUserAccount | null;
    activeUser: IUser | null;
}

export interface IUserSessionAction{
    switchAccount: (account: IUserSessionState['activeAccount']) => void;
    switchUser: (user: IUserSessionState['activeUser']) => void;
}

export interface IVaccineListState{
    vaccineList: IVaccine[];
}

export interface IVaccineListAction{
    setVaccineList: (vaccines: IVaccineListState['vaccineList']) => void;
}

