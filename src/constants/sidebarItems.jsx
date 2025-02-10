import { BookOpen, GraduationCap, House, Pencil, University, UserCog, Users } from "lucide-react";

export const adminItems = [
  {
    title: "Dashboard",
    icon: <House className="w-5 h-5" />,
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
    icon: <House className="w-5 h-5" />,
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
    title: "Quiz Management",
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

export const studentItems = [
  {
    title: "Dashboard",
    icon: <House className="w-5 h-5" />,
    path: "/student/dashboard",
  },
  {
    title: "Course Registration",
    icon: <Pencil className="w-5 h-5" />,
    path: "/student/courses",
  },
  {
    title: "My Courses",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/student/my-courses",
  },
  {
    title: "Quizzes",
    icon: <University className="w-5 h-5" />,
    path: "/student/quizzes",
  },
  {
    title: "Quizzes Results",
    icon: <GraduationCap className="w-5 h-5" />,
    path: "/student/quiz-results",
  },
  {
    title: "Settings",
    icon: <UserCog className="w-5 h-5" />,
    items: [
      {
        title: "Profile",
        path: "/student/profile",
      },
      {
        title: "Update Password",
        path: "/student/update-password",
      },
    ],
  },
];
