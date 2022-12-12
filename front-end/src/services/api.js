import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:4000/",
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(signUpData) {
  return await baseAPI.post("/signup", signUpData);
}

async function signIn(signInData) {
  return await baseAPI.post("/signin", signInData);
}

async function connectChat(token) {
  return await baseAPI.post("/chat/connect", {}, getConfig(token));
}

const api = {
  signUp,
  signIn,
  connectChat,
};

export default api;
