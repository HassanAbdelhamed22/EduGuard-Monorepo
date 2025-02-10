import toast from "react-hot-toast";
import api from "./../config/api";
import { BASE_URL } from "./../constants/index";

export const allCourses = async () => {
  try {
    const response = await api.get(`${BASE_URL}course`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const registerCourses = async (courseIds) => {
  try {
    const { data, status } = await api.post(
      `${BASE_URL}course/registerCourse`,
      courseIds
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const unregisterCourses = async (courseIds) => {
  try {
    const { data, status } = await api.post(
      `${BASE_URL}course/unregisterCourse`,
      courseIds
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
