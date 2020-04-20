export const processErrorObject = (error={})=>{
    const obj = {
        status: 500,
        message: 'Something went wrong, please try after sometime.'
    }
    if(error.response){
        if(error.response.status){
            obj.status = error.response.status;
        }
        if(error.response.data && error.response.data.message){
            obj.message = error.response.data.message;
        }
    }
    return obj;
}