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
  await baseAPI.post("/signup", signUpData);
}

async function signIn(signInData) {
  return baseAPI.post("/signin", signInData);
}

const api = {
  signUp,
  signIn
};

export default api;