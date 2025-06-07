import { IUserSessionAction, IUserSessionState, IVaccineListAction, IVaccineListState } from "../interfaces/zustand/index";
import { create } from "zustand";

export const useActiveSession = create<IUserSessionState & IUserSessionAction>()
((set) => ({
    activeAccount: null,
    activeUser: null,
    switchAccount: (activeAccount: IUserSessionState["activeAccount"]) => set(() => ({
        activeAccount: activeAccount,
        activeUser: activeAccount?.userList[0]
    })),
    switchUser: (activeUser: IUserSessionState["activeUser"]) => set(() => ({
        activeUser: activeUser
    })),
    setActiveAccount: (activeAccount: IUserSessionState["activeAccount"]) => set(() => ({
        activeAccount: activeAccount
    })),
    setActiveUser: (activeUser: IUserSessionState["activeUser"]) => set(() => ({
        activeUser: activeUser
    })),
}));

export const useVaccineList = create<IVaccineListState & IVaccineListAction>()
((set) => ({
    vaccineList: [],
    setVaccineList: (vaccineList) => set(() => ({
        vaccineList: vaccineList
    }))
}))