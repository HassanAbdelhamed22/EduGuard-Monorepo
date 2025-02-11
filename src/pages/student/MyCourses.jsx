import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/Loading';
import { getRegisteredCourses, viewCourseMaterials } from '../../services/studentService';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materialsCount, setMaterialsCount] = useState({});
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getRegisteredCourses();
      setCourses(data.registeredCourses);

      const materialPromises = data.map((course) =>
        viewCourseMaterials(course.CourseID)
      );

      // Fetch all data in parallel
      const materialsArray = await Promise.all(materialPromises);

      // Process materials and quizzes counts
      const newMaterialsCount = {};

      data.forEach((course, index) => {
        const materials = materialsArray[index] || [];

        newMaterialsCount[course.CourseID] = {
          pdf: materials.filter((m) => m.MaterialType === "pdf").length,
          video: materials.filter((m) => m.MaterialType === "video").length,
          notes: materials.filter((m) => m.MaterialType === "text").length,
          total: materials.length,
        };
      });

      // Update state only once
      setMaterialsCount(newMaterialsCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>MyCourses</div>
  )
}

export default MyCourses