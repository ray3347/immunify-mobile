
import { IUserSessionAction, IUserSessionState } from "../interfaces/zustand/index";
import {create} from "zustand";

export const useActiveSession = create<IUserSessionState & IUserSessionAction>()
((set)=>({
    activeAccount: null,
    activeUser: null,
    switchAccount: (activeAccount) => set(()=> ({
        activeAccount: activeAccount,
        activeUser: activeAccount?.userList[0]
    })),
    switchUser: (activeUser) => set(()=> ({
        activeUser: activeUser
    })),
}));