/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const setAuthToken = (token:any) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;