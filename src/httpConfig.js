import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://ec2-18-185-92-148.eu-central-1.compute.amazonaws.com/api"
});
export const api = async ({ url, method, payload = null }) => {
  let response;
  try {
    if (method === "GET") {
      response = await axios.get(url, payload);
      return response;
    } else {
      response = await axios.post(url, payload);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
