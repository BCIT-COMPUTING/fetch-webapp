import { publicRequest } from "../appConfigs";

export const hasValidJWT = async (user) => {
  const jwt = user.jwt;
  if (jwt) {
    const response = await publicRequest.post("/auth/verifyJWT", {
      jwt: jwt,
    });
    console.log(response.data, "from hasValidJWT");
    return response.data;
  }
};
