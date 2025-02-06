import toast from "react-hot-toast";
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
    const response = await api.get(
      `${BASE_URL}quiz/course-quizzes/${courseId}`
    );
    return response.data.quizzes;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const viewCourseMaterials = async (courseId) => {
  try {
    const response = await api.get(
      `${BASE_URL}professor/materials/${courseId}`
    );
    return response.data.data;
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

export const createQuiz = async (quizData) => {
  try {
    const response = await api.post(`${BASE_URL}quiz/create-quiz`, quizData);
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const data = await api.delete(`${BASE_URL}quiz/delete-quiz/${quizId}`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateQuiz = async (quizId, quizData) => {
  try {
    const { data, status } = await api.patch(
      `${BASE_URL}quiz/update-quiz/${quizId}`,
      quizData
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const uploadMaterials = async (materialData) => {
  try {
    const response = await api.post(
      `${BASE_URL}professor/materials`,
      materialData
    );
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateMaterial = async (materialId, formData) => {
  try {
    const { data, status } = await api.patch(
      `${BASE_URL}professor/materials/${materialId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteMaterial = async (materialId) => {
  try {
    const response = await api.delete(
      `${BASE_URL}professor/materials/${materialId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
