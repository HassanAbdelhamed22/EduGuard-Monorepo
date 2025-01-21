import React from "react";
import logo from "../assets/Logo.webp";
import { GraduationCap } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
      <GraduationCap className="h-8 w-8" />
      <span>EduGuard</span>
    </div>
  );
};

export default Logo;
