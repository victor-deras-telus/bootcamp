import { QueryClient } from "react-query";
const queryClient = new QueryClient();

const CURRENCY_RATES =[
  {
  id: "USDJPY",
  rate: "136.715040"
  },
  {
  id: "USDEUR",
  rate: "0.943450"
  },
  {
  id: "USDCAD",
  rate: "1.374350"
  },
  {
  id: "USDGBP",
  rate: "0.823554"
  }
  ];
const AXIOS_URL = process.env.REACT_APP_BACKEND_URL;


export { AXIOS_URL, CURRENCY_RATES, queryClient };
