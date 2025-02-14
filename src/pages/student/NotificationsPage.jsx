import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllNotifications,
  getUnreadNotifications,
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
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;
