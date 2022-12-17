import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const getCurrencies = async () => {
  return await Ax.get("/currencies");
};

const postActiveCurrency = async (params) => {
  return await Ax.post("/currency", params);
};


//HOOKS
const useCurrenciesGet = () =>
  useQuery("Currencies", getCurrencies, {
    staleTime: 50000,
  });

const useCurrenciesPost = () =>
  useMutation("postActiveCurrency", postActiveCurrency);



export {
  useCurrenciesGet,
  useCurrenciesPost,
};
