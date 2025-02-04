import React, { useState }   from "react";
import toast from "react-hot-toast";
import { createQuiz } from "../../services/professorService";
import CreateQuizForm from "../../components/forms/CreateQuizForm";

const CreateQuiz = () =>{
    const [isLoading , setIsLoading] = useState(false)
    const initialValues = {
        title : "",
        description : "",
        start_time:"",
        end_time:"",
        quiz_date:"",
        course_id : ""
    
    };

    const handleSubmit = async (values)  => {
        setIsLoading(true)
        try{
            const{data , status} = await createQuiz(values);
            if(status === 200){
                toast.success(data.message);
                initialValues.title = "";
                initialValues.description="";
                initialValues.start_time="";
                initialValues.end_time="";
                initialValues.quiz_date="";
                initialValues.course_id="";

            }
            else{
                toast.error("Unexpected server response. Please try again.")
            }
        }
        catch(error){
            const errorMessage = error.response?.data?.message;
            toast.error(errorMessage)
        }
        finally{
            setIsLoading(false)
        }
    }
    return(
        <CreateQuizForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}


        
        ></CreateQuizForm>

    )
}
export default CreateQuiz