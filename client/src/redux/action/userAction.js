import axios from 'axios';
import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAILED, USER_LOGOUT, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL} from '../constants/userConstant'


export const  login =(email,password) => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST});
        const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
          const {data} = await axios.post (
            'http://localhost:8080/api/users/login',
            {email, password},
            config
          );

          dispatch({type:USER_LOGIN_SUCCESS, payload: data});

          localStorage.setItem ('userInfo', JSON.stringify (data));
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAILED,
            payload:
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
        
    }
}

export const logout = () => (dispatch)=>{
  localStorage.removeItem("userInfo");    
  dispatch({type:USER_LOGOUT});
}


export const registration = (name, email,password,pic) => async (dispatch)=> {
  try {
    dispatch({type:USER_REGISTRATION_REQUEST})


    const config = {
      headers:{
        "Content-type":"application/json"
      }
    }
    const {data} = await axios.post('http://localhost:8080/api/users',{name, email,password,pic},config)
    dispatch({type:USER_REGISTRATION_SUCCESS, payload:data})
    dispatch({type:USER_LOGIN_SUCCESS, payload:data})
    localStorage.setItem ('userInfo', JSON.stringify (data));
  } catch (error) {
    dispatch({
      type:USER_REGISTRATION_FAIL,
      payload:
          error.response && error.response.data.message 
          ? error.response.data.message
          : error.message,
  })
  }
}

export const updateUserAction = ({ name, email, password, pic }) => async(dispatch, getState) =>{

  try {
    dispatch({type:USER_PROFILE_REQUEST});

    
    const {userLogin:{userInfo}} = getState();

    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
      }
  }

  const {data} = await axios.post("http://localhost:8080/api/users/profile", { name, email, password, pic }, config)
  console.log(data);
  dispatch({type:USER_PROFILE_SUCCESS, payload:data})
  dispatch({type:USER_LOGIN_SUCCESS, payload:data})

  localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type:USER_PROFILE_FAIL,
      payload:error.response && error.resonse.data.message  ? error.resonse.data.message : error.message
    })
  }
}