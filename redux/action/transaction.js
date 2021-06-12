import axios from "utils/axios";

export const getTransactionSummary = (token) => {
  axios.setToken(token);
  return {
    type: "GET_SUMMARY",
    payload: axios.axiosApiIntances.get("transaction/summary"),
  };
};

export const topUp = (token, data) => {
  axios.setToken(token);
  return {
    type: "TOPUP",
    payload: axios.axiosApiIntances.post("transaction", data),
  };
};
