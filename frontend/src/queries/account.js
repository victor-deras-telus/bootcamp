import { useQuery } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const getAccounts = async () => {
  return await Ax.get("/accounttypes");
};


//HOOKS
const useAccountsGet = () =>
  useQuery("Accounts", getAccounts, {
    staleTime: 50000,
  });

export { useAccountsGet };
