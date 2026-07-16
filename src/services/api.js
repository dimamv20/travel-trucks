import axios from "axios";

export const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchCampersApi = async () => {
  const { data } = await api.get("/campers");
  return data;
};

export const fetchCamperByIdApi = async id => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};