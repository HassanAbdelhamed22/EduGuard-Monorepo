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

export const viewCourseQuizzes = async (courseId) => {
  try {
    const { data } = await api.get(
      `${BASE_URL}quiz/course-quizzes/${courseId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const viewCourseMaterials = async (courseId) => {
  try {
    const { data } = await api.get(
      `${BASE_URL}professor/materials/${courseId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getAllQuizzes = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quiz/get-quizzes`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
