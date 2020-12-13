const initialState = {
    user: {},
    poster: '',
    title: '',
    rating: null,
    movies: []
}

//Action types
const GET_USER_DATA = 'GET_USER_DATA';

const CLEAR_USER_DATA = 'CLEAR_USER_DATA'


//Action Builders




export const getUserData = (user) => {
    return{
        type: GET_USER_DATA,
        payload: user
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
        payload: {
            user: {}
        }
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER_DATA: 
        console.log(action)
            return {
                ...state,
                user: action.payload
                
            }
        
        default:
             return state;
    }
}