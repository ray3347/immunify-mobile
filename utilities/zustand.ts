
import { IUserSessionAction, IUserSessionState, IVaccineListAction, IVaccineListState } from "../interfaces/zustand/index";
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

export const useVaccineList = create<IVaccineListState & IVaccineListAction>()
((set)=>({
    vaccineList: [],
    setVaccineList: (vaccineList) => set(()=>({
        vaccineList: vaccineList
    }))
}))