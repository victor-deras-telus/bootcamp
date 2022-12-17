import { useQuery,useMutation } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const getAccounts = async () => {
  return await Ax.get("/accounttypes");
};

const postAccount = async (params) => {
  return await Ax.post("/account", params);
};

const accountUpdate = async (body) => {
  return await Ax.post("/account/update", body);
};
//HOOKS
const useAccountsGet = () =>
  useQuery("Accounts", getAccounts, {
    staleTime: 50000,
  });

  const useAccountUpdate = () => useMutation("accountUpdate", accountUpdate);

  const useAccountPost = () => useMutation("postAccount", postAccount);
  
export { useAccountsGet,useAccountUpdate, useAccountPost };
