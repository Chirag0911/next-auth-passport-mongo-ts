import { jwtDecode } from "jwt-decode";

interface IJwtPayload {
  exp: number;
  [key: string]: any;
}

const checkAuthTokenValid = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  try {
    const decoded = jwtDecode<IJwtPayload>(accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("Access token expired");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid access token:", error);
    return false;
  }
};

const getDecodedAccessToken = (accessToken: string): IJwtPayload | false => {
  const isAuthTokenValid = checkAuthTokenValid(accessToken);
  if (isAuthTokenValid) {
    try {
      const decoded = jwtDecode<IJwtPayload>(accessToken);
      return { ...decoded, isAuthTokenValid };
    } catch (error) {
      console.error("Error decoding access token:", error);
      return false;
    }
  }
  return false;
};

export { getDecodedAccessToken };
