import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const getAllNotifications = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}notifications`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const getUnreadNotifications = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}notifications/unread`);
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await api.post(
      `${BASE_URL}notifications/read/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await api.post(`${BASE_URL}notifications/read-all`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await api.delete(
      `${BASE_URL}notifications/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteAllNotifications = async () => {
  try {
    const response = await api.delete(`${BASE_URL}notifications`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message);
  }
};
