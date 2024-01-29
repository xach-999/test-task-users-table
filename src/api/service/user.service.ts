import axios from "../constants/MyAxios";

function getUsers(query: string) {
  return axios.get(`/user/list` + query);
}

const UsersService = {
  getUsers
};

export default UsersService;
