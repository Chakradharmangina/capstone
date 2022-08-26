import axios from "axios";

export const adminLogin = async (payload) => {
  return await axios.post("http://localhost:3002/admin/signIn", payload);
};
