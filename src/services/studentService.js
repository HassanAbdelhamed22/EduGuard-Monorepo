import toast from "react-hot-toast";
import api from "./../config/api";
import { BASE_URL } from "./../constants/index";

export const allCourses = async () => {
  try {
    const response = await api.get(`${BASE_URL}courses`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const registerCourses = async (courseIds) => {
  try {
    const { data, status } = await api.post(
      `${BASE_URL}courses/register`,
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
      `${BASE_URL}courses/unregister`,
      courseIds
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getRegisteredCourses = async () => {
  const response = await api.get(`${BASE_URL}students/courses`);
  return response.data;
};

export const viewCourseMaterials = async (courseId) => {
  try {
    const response = await api.get(`${BASE_URL}students/materials/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getStudentQuiz = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quizzes/student-quizzes`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getAllQuizzes = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quizzes/student-quizzes`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuizQuestions = async (quizId, page) => {
  try {
    const response = await api.get(
      `${BASE_URL}questions/quiz/${quizId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quiz questions:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch quiz questions";
    toast.error(errorMessage);
    throw error;
  }
};

export const startQuiz = async (quizId) => {
  try {
    const response = await api.get(`${BASE_URL}quizzes/start/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to start quiz:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to start quiz";
    toast.error(errorMessage);
    throw error;
  }
};

export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await api.post(`${BASE_URL}quizzes/submit/${quizId}`, {
      answers,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to submit quiz";
    toast.error(errorMessage);
    throw error;
  }
};

export const getSubmittedQuizzes = async (page) => {
  try {
    const response = await api.get(
      `${BASE_URL}quizzes/submitted?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch submitted quizzes:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch submitted quizzes";
    toast.error(errorMessage);
    throw error;
  }
};

export const getQuizResult = async (quizId) => {
  try {
    const response = await api.get(`${BASE_URL}quizzes/result/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch quiz results";
    toast.error(errorMessage);
    throw error;
  }
};

export const getStudentAnswers = async (quizId, page) => {
  try {
    const response = await api.get(
      `${BASE_URL}quizzes/correct-answer/${quizId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student answers:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch student answers";
    toast.error(errorMessage);
    throw error;
  }
};
