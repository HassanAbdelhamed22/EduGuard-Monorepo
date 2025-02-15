import React, { useEffect, useState } from "react"
import { getQuizScore } from "../../services/professorService";
import { useParams } from "react-router";
import ResultsTable from "../../components/Tables/ShowResult";
import Loading from "../../components/ui/Loading";
const ShowResult = () =>{
    const { quizId } = useParams();
    const  [result , setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() =>{
        const fetchData = async () =>{
            setIsLoading(true)

            try{
                const data = await getQuizScore(quizId)
                if(data){
                    setResults(data.students_scores)
                }
            }catch(error){
                    console.error("Error fetching results:", error);
            }finally{
                setIsLoading(false)
            }
        }
        if (quizId) {
            fetchData();
        }
    } , [quizId])

    if (isLoading) {
        return <Loading />;
      }
    return(
        <div className="  p-4">
            <h1 className=" text-3xl font-bold text-gray-800 mb-8">
                Quiz Result
            </h1>
            <ResultsTable results={result} />


        </div>
    )

}
export default ShowResult