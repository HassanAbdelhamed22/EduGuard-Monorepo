import {
  Activity,
  BookOpen,
  Clock,
  File,
  GraduationCap,
  School,
  Settings,
  Users,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  getResentActivities,
  getStatistics,
} from "../../services/adminService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../../components/ui/Loading";

const initialStatistics = {
  totalUsers: 0,
  totalStudents: 0,
  totalProfessors: 0,
  totalCourses: 0,
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState(initialStatistics);

  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStatistics = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getResentActivities();
      setActivities(response.activities);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetStatistics();
    handleGetActivities();
  }, [handleGetStatistics, handleGetActivities]);

  const quickActions = useMemo(
    () => [
      {
        id: 1,
        name: "Create User",
        icon: <Users className="w-6 h-6" />,
        path: "/admin/users/create",
      },
      {
        id: 2,
        name: "Create Course",
        icon: <BookOpen className="w-6 h-6" />,
        path: "/admin/courses/create",
      },
      {
        id: 3,
        name: "Profile Settings",
        icon: <Settings className="w-6 h-6" />,
        path: "/admin/profile",
      },
      {
        id: 4,
        name: "View Reports",
        icon: <File className="w-6 h-6" />,
        path: "#",
      },
    ],
    []
  );

  const formattedActivities = useMemo(
    () =>
      activities.map((activity) => ({
        ...activity,
        formattedDate: new Date(activity.created_at).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        ),
        formattedTime: new Date(activity.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),
    [activities]
  );

  const statisticsCards = useMemo(() => {
    return [
      {
        title: "Total Users",
        value: statistics.totalUsers,
        color: "from-indigo-500 to-blue-500",
        icon: <Users className="h-6 w-6 text-indigo-500" />,
      },
      {
        title: "Professors",
        value: statistics.totalProfessors,
        color: "from-red-500 to-pink-500",
        icon: <School className="h-6 w-6 text-red-500" />,
      },
      {
        title: "Students",
        value: statistics.totalStudents,
        color: "from-yellow-500 to-orange-500",
        icon: <GraduationCap className="h-6 w-6 text-yellow-500" />,
      },
      {
        title: "Active Courses",
        value: statistics.totalCourses,
        color: "from-green-500 to-teal-500",
        icon: <BookOpen className="h-6 w-6 text-green-500" />,
      },
    ];
  }, [statistics]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-darkGray ">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 ">
            Here’s an overview of your system stats and quick actions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsCards.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-lg rounded-lg hover:scale-105 transition-transform duration-300`}
            >
              <div className="p-5 flex items-center">
                <div className="bg-white p-3 rounded-full">{stat.icon}</div>
                <div className="ml-5">
                  <h3 className="text-white text-lg font-medium">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-darkGray">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between  hover:cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Link
                  to={action.path}
                  className="flex items-center text-gray-700 "
                >
                  <div className="bg-indigo-100  p-3 rounded-full">
                    {action.icon}
                  </div>
                  <p className="ml-4 text-lg font-medium">{action.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-darkGray">
            Recent Activities
          </h2>
          <div className=" shadow-lg rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {formattedActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <div className="px-6 py-4 sm:px-8 flex items-start space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-gray-500" />
                          <p className="text-sm font-medium text-primary truncate">
                            {activity.Activity}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-500">
                            {activity.formattedDate} {activity.formattedTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
