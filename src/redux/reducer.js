const initialState = {
    id: null,
    username: ''
}


const GET_USER_DATA = 'GET_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

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

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER_DATA:
            return {
                id: action.payload.id,
                username: action.payload.username
            }
            case UPDATE_USER_DATA:
                return {
                    username: action.payload.username
                }
            default: 
            return state;
    }
}