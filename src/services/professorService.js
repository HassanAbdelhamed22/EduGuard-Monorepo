import api from "../config/api";
import { BASE_URL } from "../constants";

export const viewRegisteredCourses = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}professor/courses`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getAllQuizzes = async () => {
  try {
    const { quizzes } = await api.get(`${BASE_URL}quiz/get-quizzes`);
    return quizzes;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
