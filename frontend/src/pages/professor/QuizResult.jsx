import React, { useState, useEffect, useMemo, useCallback } from "react";
import Button from "../../components/ui/Button";
import { getQuizResult } from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import { useNavigate } from "react-router";
import { ArrowUpDown } from "lucide-react";
import SortDropdown from "./../../components/ui/SortDropdown";
import SearchBar from "./../../components/ui/SearchBar";
import debounce from "lodash/debounce";
import CustomSelect from "./../../components/ui/CustomSelect";
import PaginationLogic from "../../components/PaginationLogic";

const ViewResults = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy] = useState("QuizDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });

  // Extract unique courses from quizzes
  useEffect(() => {
    const uniqueCourses = [
      ...new Set(
        quizzes.map((quiz) =>
          JSON.stringify({
            id: quiz.course_details.id,
            name: quiz.course_details.name,
          })
        )
      ),
    ].map((course) => JSON.parse(course));
    setCourses(uniqueCourses);
  }, [quizzes]);

  const fetchData = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await getQuizResult(params);
      setQuizzes(response.data);
      setPagination({ ...response.pagination, current_page: params.page || 1 });
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue) => {
        fetchData({
          search: searchValue,
          sortBy,
          sortOrder,
          courseId: selectedCourse,
          page: pagination.current_page,
        });
      }, 300),
    [sortBy, sortOrder, selectedCourse, pagination.current_page]
  );

  useEffect(() => {
    fetchData({
      sortBy,
      sortOrder,
      courseId: selectedCourse,
      page: pagination.current_page,
    });
  }, [sortBy, sortOrder, selectedCourse, pagination.current_page]);

  const handlePageChange = useCallback(
    (page) => {
      if (
        page !== pagination.current_page &&
        page > 0 &&
        page <= pagination.total_pages
      ) {
        setPagination((prev) => ({ ...prev, current_page: page }));
      }
    },
    [pagination]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchEnter = () => {
    debouncedSearch(searchTerm);
  };

  const toggleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">View Results</h1>

      {/* Filters and Search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-64">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onEnter={handleSearchEnter}
            placeholder="Search by quiz title or course..."
          />
        </div>

        <CustomSelect
          value={selectedCourse}
          onChange={setSelectedCourse}
          options={[
            { value: "", label: "All Courses" },
            ...courses.map((course) => ({
              value: course.id,
              label: course.name,
            })),
          ]}
          className="w-full md:w-48 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />

        <Button
          variant="outline"
          onClick={toggleSort}
          className="w-full md:w-auto flex items-center gap-2"
        >
          Sort by Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Quiz Cards */}
      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No quizzes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(({ quiz_details, course_details, students_count }) => (
            <div
              key={quiz_details.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {quiz_details.title}
                </h2>
                <span className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">
                  {students_count} students
                </span>
              </div>

              <p className="text-gray-600 mb-2">
                {course_details.name} ({course_details.code})
              </p>

              <div className="text-sm text-gray-500 space-y-2">
                <p>
                  <span className="font-medium">Created at:</span>{" "}
                  {new Date(quiz_details.quiz_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {new Date(quiz_details.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {new Date(quiz_details.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <span className="font-medium">Total Marks:</span>{" "}
                  {quiz_details.total_marks}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {quiz_details.duration} minutes
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="default"
                  fullWidth
                  className="mt-6"
                  onClick={() =>
                    navigate(`/professor/quiz/results/${quiz_details.id}`)
                  }
                >
                  Show Result
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  className="mt-6"
                  onClick={() =>
                    navigate(`/professor/quiz/cheaters/${quiz_details.id}`)
                  }
                >
                  Show Cheaters
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8">
        <PaginationLogic
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ViewResults;
