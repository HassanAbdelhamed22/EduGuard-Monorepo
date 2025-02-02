import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const getStatistics = async () => {
  const { data } = await api.get(`${BASE_URL}admin/statistics`);
  return data;
};

export const getResentActivities = async () => {
  const { data } = await api.get(`${BASE_URL}admin/recent-activities`);
  return data;
};

export const getAllUsers = async (page) => {
  const response = await api.get(`${BASE_URL}admin/users?page=${page}`);
  const { data, pagination } = response.data;
  return { data, pagination };
};

export const createUserAccount = async (userData) => {
  try {
    const { data, status } = await api.post(`${BASE_URL}admin/users`, userData);
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateUserAccount = async (id, userData) => {
  try {
    const { data, status } = await api.patch(
      `${BASE_URL}admin/users/${id}`,
      userData
    );
    return { data, status };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteUserAccount = async (id) => {
  const { data: response } = await api.delete(`${BASE_URL}admin/users/${id}`);
  return response;
};

export const assignRole = async (userId, role) => {
  const { data, status } = await api.post(
    `${BASE_URL}admin/users/assign-role`,
    { user_id: userId, role }
  );
  return { data, status };
};

export const getAllStudents = async (page) => {
  const response = await api.get(`${BASE_URL}admin/students?page=${page}`);
  const { students, pagination } = response.data;
  return { students, pagination };
};

export const suspendUser = async (id, reason) => {
  const { data, status } = await api.post(`auth/students/${id}/suspend`, {
    reason,
  });
  return { data, status };
};

export const unSuspendUser = async (id) => {
  const { data, status } = await api.post(`auth/students/${id}/unsuspend`);
  return { data, status };
};

export const getAllProfessors = async (page) => {
  const response = await api.get(`${BASE_URL}admin/professors?page=${page}`);
  const { professors, pagination } = response.data;
  return { professors, pagination };
};

export const getAllCourses = async (page) => {
  const response = await api.get(
    `${BASE_URL}admin/courses/with-professor?page=${page}`
  );
  const { data, pagination } = response.data;
  return { data, pagination };
};

export const createCourse = async (courseData) => {
  const { data, status } = await api.post(
    `${BASE_URL}admin/courses`,
    courseData
  );
  return { data, status };
};

export const updateCourse = async (id, courseData) => {
  const { data, status } = await api.patch(
    `${BASE_URL}admin/courses/${id}`,
    courseData
  );
  return { data, status };
};

export const deleteCourse = async (id) => {
  const { data } = await api.delete(`${BASE_URL}admin/courses/${id}`);
  return data;
};

export const assignCourse = async (CourseID, ProfessorID) => {
  const { data, status } = await api.post(
    `${BASE_URL}admin/courses/assign-professor`,
    {
      CourseID,
      ProfessorID,
    }
  );
  return { data, status };
};
