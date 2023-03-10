import axios from "axios";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_UPDATE_REQUEST, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_SUCCESS, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS } from "../constants/noteConstanst"


export const listNotes = () => async (dispatch,getState)=>{
    try {
        dispatch({type:NOTE_LIST_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.get('http://localhost:8080/api/notes',config)

        dispatch({type:NOTE_LIST_SUCCESS, payload:data});
    } catch (error) {
        dispatch({
            type:NOTE_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const createNoteList = (title, content, category) => async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_CREATE_REQUEST});
        
        const {userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.post("http://localhost:8080/api/notes/create",{title, content, category},config);
        dispatch({type:NOTE_CREATE_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:NOTE_CREATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const updateNoteAction = (id,title,content,category) => async (dispatch, getState)=>{
    try {
            dispatch({type:NOTE_UPDATE_REQUEST});
            
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            const {data} = await axios.put(`http://localhost:8080/api/notes/${id}`,{title,content,category}, config)

            dispatch({type:NOTE_UPDATE_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:NOTE_UPDATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const noteDeletedAction = (id) => async (dispatch, getState)=>{
    try {
            dispatch({type:NOTE_DELETE_REQUEST});
            
            const {userLogin:{userInfo}} = getState();

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            console.log(userInfo.token)
            const {data} = await axios.delete(`http://localhost:8080/api/notes/${id}`, config)

            dispatch({type:NOTE_DELETE_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:NOTE_UPDATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}