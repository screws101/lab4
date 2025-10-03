export const initialState = {
    values: {name: "", title: "", email: "", bio: "", img: null},
    errors: "",
    isSubmitting: false,
    success: ""
}


export const formReducer = (state, action) => {
    switch(action.type){
        case'SET_IMG':
            return {
                ...state,
                errors: action.payload ? "" : "File needs to be less than 1MB",
                values: {...state.values, img: action.payload}
            };

        case 'SET_VALUES':
            const {name, value} = action.payload
            return {
                ...state,
                values: {...state.values, [name]: value}
            }
        case 'START_SUBMITTING':
            return {
                ...state,
                isSubmitting: true
            }
        case "SUBMIT_SUCCESS":
            return {
                ...state,
                success: "Form has been submitted successfully",
                values: {name: "", title: "", email: "", bio: "", img: null}
            }
        case "CLEAR_SUCCESS":
            return {
                ...state,
                success: "",
            }
        case "HAS_ERROR":
            return {
                ...state,
                success: "Something is wrong",
            }
        case "FINISH_SUBMIT":
            return {
                ...state,
                isSubmitting: false,
            }
        default:
            return state;
    }
}