import React from 'react';
import Button from '../../components/ui/Button';
const CourseList = () => {
  const courses = [
    { code: 'CS101', title: 'Introduction to Computer Science', students: 150, tags: ['CS', 'Intro'] },
    { code: 'MATH201', title: 'Advanced Mathematics', students: 85, tags: ['Mathematics', 'Algebra'] },
    { code: 'PHY301', title: 'Physics Principles', students: 60, tags: ['Physics', 'Mechanics'] }
  ];

  return (
    <div className="container p-4 mx-auto">
      <div className="flex gap-4">
        {courses.map((course) => (
          <div key={course.code} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-72">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{course.code}</h3>
              <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                {course.students} students
              </span>
            </div>
            <hr className="mb-2 border-gray-300" />
            <p className="mb-3 font-medium text-gray-600 text-md">{course.title}</p>
            <div className="flex justify-center gap-2 mb-3">
             <Button variant={"default"} className={" flex-1"}>  
             View Quizzes

             </Button>
              
              <Button variant={"outline"} className={" flex-1"}>                View Materials
</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;