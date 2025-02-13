import React from 'react';
import Button from '../../components/ui/Button';
import { getQuizResult } from '../../services/professorService';
import Loading from '../../components/ui/Loading';
import { useState , useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

const ViewResults = () => {
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


  const fetchData = async () =>{
    setIsLoading(true)
    try{
        const quizReg =  await getQuizResult();
        setQuizzes(quizReg.data)
    } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }

  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=' p-6 bg-gray-100 min-h-screen' >
              <h1 className="text-2xl font-bold mb-6">View Results</h1>
    <div className=' flex gap-6 flex-wrap'>
        {quizzes.map(({quiz_details, course_details, students_count }) =>(
            <div key={quiz_details.id} className='bg-white p-6 rounded-lg shadow-md w-80'>
                <div className='flex flex-wrap items-center justify-between mb-4'>
                <p className="text-black-600  font-bold">{quiz_details.title}</p>

                      <span className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">
                  {students_count} students
                </span>
                </div>
                <h2 className='  text-gray-600  hover:text-indigo-600 duration-300 '>
                    {course_details.name} ({course_details.code} )                 </h2>

                <p className="text-gray-600 ">Carted at: {quiz_details.quiz_date}</p>
              <div className='flex flex-wrap items-center justify-between '>
                
              <p className="text-gray-600">From: {new Date(quiz_details.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="text-gray-600">To: {new Date(quiz_details.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>

              </div>
                <p className="text-gray-600 ">Total Marks: {quiz_details.total_marks}</p>
                <p className="text-gray-600 ">Duration: {quiz_details.duration} minutes </p>

                <Button 
                variant={"default"}
                fullWidth
                className="mt-4"
                onClick= { () => navigate(`/professor/quiz/results/${quiz_details.id}`)}
                
                >

                Show Result
              </Button>
            </div>
        ))}

    </div>
    </div>
  );
};

export default ViewResults;
