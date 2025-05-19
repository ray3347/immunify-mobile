import { IUserAccount } from "../db/IAccount";
import { IUser } from "../db/IUser";

export interface IUserSessionState{
    activeAccount: IUserAccount | null;
    activeUser: IUser | null;
}

export interface IUserSessionAction{
    switchAccount: (account: IUserSessionState['activeAccount']) => void;
    switchUser: (user: IUserSessionState['activeUser']) => void;
}

