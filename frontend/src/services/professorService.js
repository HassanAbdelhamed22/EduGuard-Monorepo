import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const viewRegisteredCourses = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}professors/courses`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const fetchCourseRegistrations = async (courseId, page) => {
  const response = await api.get(
    `${BASE_URL}courses/${courseId}/students?page=${page}`
  );
  const { data, pagination } = response.data;
  return { data, pagination };
};

export const viewCourseQuizzes = async (courseId, options = {}) => {
  const { page = 1, search = "", sort_order = "nearest" } = options;
  try {
    const response = await api.get(`${BASE_URL}quizzes/course/${courseId}`, {
      params: {
        page,
        search,
        sort_order,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course quizzes:", error);
    throw error;
  }
};

export const viewCourseMaterials = async (courseId) => {
  try {
    const response = await api.get(
      `${BASE_URL}professors/materials/${courseId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getAllQuizzes = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}quizzes`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await api.post(`${BASE_URL}quizzes`, quizData);
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const data = await api.delete(`${BASE_URL}quizzes/${quizId}`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateQuiz = async (quizId, quizData) => {
  try {
    const { data, status } = await api.patch(
      `${BASE_URL}quizzes/${quizId}`,
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
      `${BASE_URL}professors/materials`,
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
      `${BASE_URL}professors/materials/${materialId}`,
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
      `${BASE_URL}professors/materials/${materialId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await api.post(`${BASE_URL}questions`, questionData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateQuestion = async (questionId, updatedQuestion) => {
  try {
    const { data } = await api.patch(
      `${BASE_URL}questions/${questionId}`,
      updatedQuestion
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const { data } = await api.delete(`${BASE_URL}questions/${questionId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getQuiz = async (quizId) => {
  try {
    const response = await axios.get(`${BASE_URL}quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    return null;
  }
};

export const getQuizDetails = async (quizId, page) => {
  try {
    const response = await api.get(`${BASE_URL}quizzes/${quizId}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuizResult = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      search: params.search || "",
      sortBy: params.sortBy || "QuizDate",
      sortOrder: params.sortOrder || "desc",
      courseId: params.courseId || "",
      page: params.page || 1,
    }).toString();

    const { data } = await api.get(
      `${BASE_URL}quizzes/ended-with-results?${queryParams}`
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuizScore = async (quiz_id) => {
  try {
    const response = await api.get(`${BASE_URL}quizzes/scores/${quiz_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    return null;
  }
};

export const getBestPerformers = async () => {
  try {
    const response = await api.get(
      `${BASE_URL}professors/courses-with-results`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getCheatersInQuiz = async (quizId) => {
  try {
    const response = await api.get(
      `${BASE_URL}professors/quizzes/${quizId}/cheaters`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getCheatingLogs = async (quizId, studentId) => {
  try {
    const response = await api.get(
      `${BASE_URL}professors/quizzes/${quizId}/${studentId}/cheating-logs`
    );
    console.log(
      `getCheatingLogs response for quizId ${quizId}, studentId ${studentId}:`,
      response.data
    );
    return response.data || { logs: [] }; // Default to empty logs array if data is missing
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const resetCheatingScore = async (quizId, studentId) => {
  try {
    const response = await api.post(
      `/professors/quizzes/${quizId}/results/${studentId}/edit`
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting cheating score:", error);
    toast.error(
      error?.response?.data?.message || "Failed to reset cheating score"
    );
    throw error;
  }
};

export const getStudentAnswers = async (quizId, page = 1, studentId) => {
  try {
    const response = await api.get(
      `/professors/quizzes/${quizId}/results/${studentId}`,
      {
        params: { page, per_page: 5 },
      }
    );
    console.log(
      "professorService getStudentAnswers raw response:",
      response.data
    );
    const { quiz, correct_answers = [], pagination = {} } = response.data;

    return {
      quiz: quiz || null,
      questions: correct_answers || [],
      pagination: {
        current_page: pagination.current_page || page,
        total_pages: pagination.total_pages || 1,
        total_items: pagination.total_items || correct_answers.length,
        per_page: pagination.per_page || 5,
      },
    };
  } catch (error) {
    console.error("Failed to fetch student answers:", error);
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch student answers";
    toast.error(errorMessage);
    return {
      quiz: null,
      questions: [],
      pagination: {
        current_page: page,
        total_pages: 1,
        total_items: 0,
        per_page: 5,
      },
    };
  }
};
