import { toast } from "react-toastify";

const HandleError = (error) => { 
    toast.error(error.response.data.errors[0].msg)
}
export default HandleError;