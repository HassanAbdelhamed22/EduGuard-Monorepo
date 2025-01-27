import { BookOpen, GraduationCap, School, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getStatistics } from "../../services/adminService";
import toast from "react-hot-toast";

const initialStatistics = {
  totalUsers: 0,
  totalStudents: 0,
  totalProfessors: 0,
  totalCourses: 0,
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState(initialStatistics);

  useEffect(() => {
    handleGetStatistics();
  }, []);

  const handleGetStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (error) {
      toast.error(error);
    }
  } 

  const recentActivities = [
    {
      id: 1,
      type: "New Professor",
      message: "Dr. Sarah Johnson joined Computer Science",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Exam Alert",
      message: "Multiple submissions detected in CS101 Final",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "Course Added",
      message: "New course: Advanced Machine Learning",
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "System Alert",
      message: "Peak user activity detected",
      time: "6 hours ago",
    },
  ];

  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Users */}
          <div className="bg-indigo-100 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Total Users
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {statistics.totalUsers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Professors */}
          <div className="bg-red-100 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <School className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Professors
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {statistics.totalProfessors}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="bg-yellow-100 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Students
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {statistics.totalStudents}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Courses */}
          <div className="bg-green-100 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Active Courses
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {statistics.totalCourses}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
