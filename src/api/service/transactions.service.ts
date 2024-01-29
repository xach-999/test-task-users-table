import axios from "../constants/MyAxios";

function getUserTransactions(id: string) {
  return axios.get(`/user/${id}/transactions`);
}

const TransactionsService = {
  getUserTransactions
};

export default TransactionsService;
