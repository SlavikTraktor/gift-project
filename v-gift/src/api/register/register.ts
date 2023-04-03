import { BACKEND_URL } from "@/constants/api";
import axios from "axios";

export interface RegisterParams {
  email: string;
  name: string;
  password: string;
}

export const registrationApi = async (params: RegisterParams) => {
  return await axios.post(BACKEND_URL + "register", JSON.stringify(params), {
    headers: {
      "content-type": "application/json",
    },
  });
};
