import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

 export const viewRegisteredCourses = async () =>{
    try {
        const {data} = await api.get(`${BASE_URL}student/courses`)
        return data
    } catch(error){
        console.error(error);
        toast.error(error?.response?.data?.message)
    }

 }
 export const getStudntQuiz =  async () =>{
    try{
        const{data} = await api.get(`${BASE_URL}quiz/student-quizzes`)
        return data
    } catch(error){
            console.error(error);
            toast.error(error?.response?.data?.message)
    }

 }