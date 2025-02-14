import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
} from "../../services/notificationService";
import toast from "react-hot-toast";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch notifications and unread count
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const allNotifications = await getAllNotifications();
      const unreadNotifications = await getUnreadNotifications();
      setNotifications(allNotifications.notifications);
      setUnreadCount(unreadNotifications.notifications.length);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  })

  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      toast.success("Notification marked as read");
      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notification as read");
    }
  }
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;
