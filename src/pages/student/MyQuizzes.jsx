import { useState, useEffect } from "react";
import { getAllQuizzes } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import { Search } from "lucide-react";

const MyQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [quizStatus, setQuizStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const quizReg = await getAllQuizzes();
            setQuizzes(quizReg.quizzes);

            const initialStatus = quizReg.quizzes.reduce((acc, quiz) => {
                acc[quiz.QuizID] = true;
                return acc;
            }, {});
            setQuizStatus(initialStatus);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkStartTime = () => {
            const now = new Date();
            const updatedStatus = { ...quizStatus };

            quizzes.forEach((quiz) => {
                const startTime = new Date(quiz.StartTime);
                if (now >= startTime) {
                    updatedStatus[quiz.QuizID] = false;
                }
            });

            setQuizStatus(updatedStatus);
        };

        checkStartTime();
        const interval = setInterval(checkStartTime, 1000);
        return () => clearInterval(interval);
    }, [quizzes]);

    if (isLoading) {
        return <Loading />;
    }

    const filteredQuizzes = quizzes
    .filter(quiz =>
        quiz.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime));


    return (
        <div className="p-6">
            <div className="flex justify-center mb-6 relative w-1/2 mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by Course Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg"
                />
            </div>
            {filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div key={quiz.QuizID} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold">{quiz.Title}</h2>
                            <p className="text-gray-600">
                                Date: {quiz.QuizDate} | Start: {new Date(quiz.StartTime).toLocaleTimeString()}
                            </p>
                            <p className="text-gray-600">
                                End: {new Date(quiz.EndTime).toLocaleTimeString()}
                            </p>
                            <p className="text-gray-600">Duration: {quiz.Duration} minutes</p>
                            <p className="text-gray-600">
                                Course: {quiz.CourseName} ({quiz.CourseCode})
                            </p>
                            <div className="flex justify-between mt-4">
                                <Button
                                    className={`px-4 py-2 rounded text-white ${quizStatus[quiz.QuizID] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-900'}`}
                                    disabled={quizStatus[quiz.QuizID]}
                                >
                                 Start
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No quizzes found.</p>
            )}
        </div>
    );
};

export default MyQuizzes;