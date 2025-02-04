import api from "../config/api";
import { BASE_URL } from "../constants";

export const viewRegisteredCourses = async () => {
  const { data } = await api.get(`${BASE_URL}professor/courses`);
  return data;
};
