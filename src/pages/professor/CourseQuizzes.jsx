import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { viewCourseQuizzes } from '../../services/professorService';
import Loading from '../../components/ui/Loading';

const CourseQuizzes = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const { data } = await viewCourseQuizzes(courseId);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>CourseQuizzes</div>
  )
}

export default CourseQuizzes