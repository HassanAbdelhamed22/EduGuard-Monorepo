import { useEffect, useState } from "react";
import { getCheatersInQuiz } from "../../services/professorService";
import { useParams } from "react-router";
import Loading from "../../components/ui/Loading";
import CheatersTable from "../../components/Tables/CheatersTable";
const ShowCheaters = () => {
  const { quizId } = useParams();
  const [cheaters, setCheaters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCheatersInQuiz(quizId);
        if (data) {
          setCheaters(data);
        }
      } catch (error) {
        console.error("Error fetching cheaters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (quizId) {
      fetchData();
    }
  }, [quizId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="  p-4">
      <h1 className=" text-3xl font-bold text-gray-800 mb-8">Quiz cheaters</h1>
      <CheatersTable results={cheaters} />
    </div>
  );
};
export default ShowCheaters;
