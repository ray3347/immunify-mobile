import { Alert } from "react-native";
import HttpService from "../../constants/HttpService";
import { IApiResult } from "../../interfaces/api";
import { IVaccine } from "../../interfaces/db/IVaccine";

export const fetchVaccines = async (latitude: string, longtitude: string) => {
      try {
        const res : IApiResult<IVaccine[]> = await HttpService.get(`/wiki/vaccine?latitude=${latitude}&longtitude=${longtitude}`);
        
        return res.data.data;
        // HttpService.get("/wiki/vaccine")
        // .then((res: IApiResult<IVaccine[]>)=>{
        //   setVaccineList(res.data.data)
        //   setLoading(false);
        // })
        // setCardData(res.data.data);
        
      } catch (error) {
        console.error("Failed to fetch vaccine data", error);
        // Use fallback data when API fails
        
        Alert.alert(
          "Connection Error",
          "Could not connect to server. Showing sample data instead.",
          [{ text: "OK" }]
        );
      }
    };
