import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const getRegisteredCourses = async () => {
  const response = await api.get(`${BASE_URL}student/courses`);
  return response.data;
};

export const getStudentQuiz = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quiz/student-quizzes`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
