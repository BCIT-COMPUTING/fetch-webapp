import axios from "axios";
import { publicRequest } from "../appConfigs";

export const hasValidJWT = async (userJWT) => {
  if (userJWT) {
    const response = await publicRequest.post("/auth/verifyJWT", {
      jwt: userJWT,
    });
    console.log(response.data, "from hasValidJWT");
    return response.data;
  }
};
