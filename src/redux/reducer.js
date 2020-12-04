const initialState = {
    username: '',
    poster: '',
    title: '',
    rating: null,
    movies: []
}

//Action types
const GET_USER_DATA = 'GET_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
const CLEAR_USER_DATA = 'CLEAR_USER_DATA'


//Action Builders


export const updateUserData = (username) => {
    return {
        type: UPDATE_USER_DATA,
        payload: {username}
    }
}

export const getUserData = (id, username) => {
    return{
        type: GET_USER_DATA,
        payload: {id, username}
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
        payload: {
            username: ''
        }
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER_DATA: 
            return {
                id: action.payload.id,
                username: action.payload.username,
                
            }
        case UPDATE_USER_DATA:
            return{
                username: action.payload.username,
                
            }
        default:
             return state;
    }
}