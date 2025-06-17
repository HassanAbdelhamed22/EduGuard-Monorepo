import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAllNotifications,
  deleteNotification,
  getAllNotifications,
  getUnreadNotificationCount,
  getUnreadNotifications,
  markAllAsRead,
  markAsRead,
} from "../../services/notificationService";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  PenSquare,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/QuizCard";
import PaginationLogic from "../../components/PaginationLogic";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementUnreadCount,
  setUnreadCount,
} from "../../redux/slices/notificationsSlice";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const navigate = useNavigate();
  const unreadCount = useSelector((state) => state.notifications.unreadCount);

  // Fetch notifications and unread count
  const fetchNotifications = async (page) => {
    setLoading(true);
    try {
      const allNotifications = await getAllNotifications(page);
      const unreadCount = await getUnreadNotificationCount();
      setNotifications(allNotifications.notifications);
      dispatch(setUnreadCount(unreadCount));
      setPagination({ ...allNotifications.pagination, current_page: page });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(pagination.current_page);
  }, []);

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchNotifications(page);
    }
  };

  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      toast.success("Notification marked as read");
      dispatch(decrementUnreadCount());
      fetchNotifications(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notification as read");
    }
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
      dispatch(setUnreadCount(0));
      fetchNotifications(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  // Handle deleting a notification
  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      toast.success("Notification deleted");
      dispatch(decrementUnreadCount());
      fetchNotifications(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification");
    }
  };

  // Handle deleting all notifications
  const handleDeleteAllNotifications = async () => {
    try {
      await deleteAllNotifications();
      toast.success("All notifications deleted");
      dispatch(setUnreadCount(0));
      fetchNotifications(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete all notifications");
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (notification.Type === "quiz") {
      navigate(`/student/quizzes`);
    } else if (notification.Type === "material") {
      navigate(`/student/materials/${notification.CourseID}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "quiz":
        return <PenSquare className="w-6 h-6 text-blue-500" />;
      case "material":
        return <BookOpen className="w-6 h-6 text-green-500" />;
      default:
        return <Bell className="w-6 h-6 text-primary" />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card className="max-w-5xl mx-auto my-8 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <div className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full text-center w-24">
              {unreadCount} unread
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="danger" onClick={handleDeleteAllNotifications}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete all
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No notifications found
          </p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.NotificationID}>
              <Card
                onClick={() => handleNotificationClick(notification)}
                className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border ${
                  !notification.is_read
                    ? "border-l-4 border-primary bg-indigo-50" // Unread style
                    : "border-gray-200 bg-white" // Read style
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getNotificationIcon(notification.Type)}
                      <div className="flex-1">
                        <p
                          className={` ${
                            !notification.is_read
                              ? "font-medium text-gray-900" // Unread text
                              : "text-gray-600" // Read text
                          }`}
                        >
                          {notification.Message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.SendAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {/* Show check icon only for unread notifications */}
                      {!notification.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.NotificationID);
                          }}
                          className="hover:bg-green-100"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.NotificationID);
                        }}
                        className="hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors ml-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </CardContent>

      <div className="mb-4">
        <PaginationLogic
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </Card>
  );
};

export default NotificationsPage;
