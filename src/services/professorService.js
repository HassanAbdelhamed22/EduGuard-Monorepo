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

export const fetchCourseRegistrations = async (courseId, page) => {
  const response = await api.get(
    `${BASE_URL}course/${courseId}/students?page=${page}`
  );
  const { data, pagination } = response.data;
  return { data, pagination };
};

export const viewCourseQuizzes = async (courseId, options = {}) => {
  const { page = 1, search = "", sort_order = "nearest" } = options;
  try {
    const response = await api.get(`${BASE_URL}quiz/course-quizzes/${courseId}`, {
      params: {
        page,
        search,
        sort_order
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course quizzes:", error);
    throw error;
  }
}

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

export const uploadMaterials = async (formData) => {
  try {
    const response = await api.post(
      `${BASE_URL}professor/materials`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateMaterial = async (materialId, materialData) => {
  try {
    const { data, status } = await api.patch(
      `${BASE_URL}professor/materials/${materialId}`,
      materialData
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

export const createQuestion = async (questionData) => {
  try {
    const response = await api.post(
      `${BASE_URL}quiz/add-question`,
      questionData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateQuestion = async (questionId, updatedQuestion) => {
  try {
    console.log("Sending update request with data:", updatedQuestion);
    const { data } = await api.patch(
      `${BASE_URL}quiz/update-question/${questionId}`,
      updatedQuestion
    );
    console.log("Response from server:", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const { data } = await api.delete(
      `${BASE_URL}quiz/delete-question/${questionId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getQuiz = async (quizId) => {
  try {
    const response = await axios.get(`${BASE_URL}quiz/get-quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    return null;
  }
};

export const getQuizDetails = async (quizId, page) => {
  try {
    const response = await api.get(
      `${BASE_URL}quiz/get-quiz/${quizId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuizResult = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quiz/ended-with-results`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuizScore = async (quiz_id) => {
  try {
    const response = await api.get(`${BASE_URL}quiz/getQuizScores/${quiz_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    return null;
  }
};

export const getBestPerformers = async () => {
  try {
    const response = await api.get(`${BASE_URL}professor/getCoursesWithResults`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
