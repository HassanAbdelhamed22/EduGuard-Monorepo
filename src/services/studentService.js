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

export const getRegisteredCourses = async () => {
  const response = await api.get(`${BASE_URL}student/courses`);
  return response.data;
};

export const viewCourseMaterials = async (courseId) => {
  try {
    const response = await api.get(
      `${BASE_URL}student/materials/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
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

export const getAllQuizzes  = async () =>{
  try{
    const {data} = await api.get(`${BASE_URL}quiz/student-quizzes`);
    return data;
  } catch(error){
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const startQuiz = async (quizId) => {
  try {
    const response = await api.get(`${BASE_URL}quiz/start-quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};