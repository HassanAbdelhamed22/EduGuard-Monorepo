import { BookOpen, UserCog, Users } from "lucide-react";

export const adminItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    title: "User Management",
    icon: <Users className="w-5 h-5" />,
    items: [
      {
        title: "All Users",
        path: "/admin/users",
      },
      {
        title: "Students",
        path: "/admin/students",
      },
      {
        title: "Professors",
        path: "/admin/professors",
      },
      {
        title: "Create User",
        path: "/admin/users/create",
      },
    ],
  },
  {
    title: "Course Management",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      {
        title: "All Courses",
        path: "/admin/courses",
      },
      {
        title: "Create Course",
        path: "/admin/courses/create",
      },
      {
        title: "Assign Course",
        path: "/admin/courses/assign",
      },
    ],
  },
  {
    title: "Settings",
    icon: <UserCog className="w-5 h-5" />,
    items: [
      {
        title: "Profile",
        path: "/admin/profile",
      },
      {
        title: "Update Password",
        path: "/admin/update-password",
      },
    ]
  },
];
