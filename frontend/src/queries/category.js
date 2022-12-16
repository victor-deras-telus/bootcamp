import { useQuery } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const getCtgs = async () => {
  return await Ax.get("/categories");
};

//HOOKS
const useCategoriesGet = () =>
  useQuery("Categories", getCtgs, {
    staleTime: 50000,
  });


export { useCategoriesGet };
