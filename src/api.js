import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.twitter.com/",
  headers: {
    authorization:
      "Bearer AAAAAAAAAAAAAAAAAAAAAJqnCgEAAAAAcpmOZJcEfBgZmzOtalQIVQFdbBQ%3DdX5kMtwko0gZvY0AuWJGSWfYVYZ1QQEh6dSN9gVGTw3HVoBaFe"
  }
});
export const api = async ({ url, method, payload = null }) => {
  console.log(url, method, payload);
  let response;
  try {
    if (method === "GET") {
      response = await axios.get(url);
      return response;
    } else {
      response = await axios.post(url, payload);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
