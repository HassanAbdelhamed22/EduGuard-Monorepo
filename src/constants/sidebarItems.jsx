import { BookOpen, University, UserCog, Users } from "lucide-react";

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
    ],
  },
];

export const professorItems = [
  {
    title: "Dashboard",
    path: "/professor/dashboard",
  },
  {
    title: "Course Management",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      {
        title: "My Courses",
        path: "/professor/courses",
      },
      {
        title: "Upload Material",
        path: "/professor/courses/upload-material",
      },
      {
        title: "Manage Course Material",
        path: "/professor/courses/manage-material",
      },
    ],
  },
  {
    title: 'Quiz Management',
    icon: <University className="w-5 h-5" />,
    items: [
      {
        title: "My Quizzes",
        path: "/professor/quizzes",
      },
      {
        title: "Create Quiz",
        path: "/professor/quizzes/create",
      },
      {
        title: "Add Questions",
        path: "/professor/quizzes/add-questions",
      },
      {
        title: "Manage Questions",
        path: "/professor/quizzes/manage-questions",
      },
      {
        title: "View Quiz List",
        path: "/professor/quizzes/view-list",
      },
    ],
  },
  {
    title: "Settings",
    icon: <UserCog className="w-5 h-5" />,
    items: [
      {
        title: "Profile",
        path: "/professor/profile",
      },
      {
        title: "Update Password",
        path: "/professor/update-password",
      },
    ],
  },
];
