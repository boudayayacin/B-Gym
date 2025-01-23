import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertError, alertSuccess, extractErrorMessage } from "../feedback.js/feddback";


export const requestLogin = createAsyncThunk("users/requestLogin" , async({email , password}, {rejectWithValue})=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {email , password})
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.error)
    }
})

export const getUser = createAsyncThunk('/users/getUser', async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
  return res.data
})

export const requestRegister = createAsyncThunk(
  "users/requestRegister", 
  async({firstName, lastName, email, password, role , navigate},
     { rejectWithValue })=>{
try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, { firstName, lastName, email, password ,role })
    navigate('/login')
    return res.data
}catch (error) {
    const errorMessage = extractErrorMessage(error)
    return rejectWithValue(errorMessage)
}
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        isAuthenticated: false,
        token: null ,
        details: null,
        isLoading: false,
        error: null
       
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.details = action.payload.userExist
      localStorage.setItem('token', state.token);
      localStorage.setItem('userDetails', JSON.stringify(state.details));
    },
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('userDetails')
      state.isAuthenticated = false
      state.token = null
      state.details = null
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(requestLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(requestLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token
      state.details = action.payload.userExist
      localStorage.setItem('token', state.token)
      localStorage.setItem('userDetails',JSON.stringify(state.details))
     
      console.log('Token dans localStorage:', localStorage.getItem('token'));
      console.log('Détails user from slice :', localStorage.getItem('userDetails'));
          // const { token, userExist } = action.payload;
          // state.token = token;
          // state.details = userExist;
          // localStorage.setItem('token', token);
          // localStorage.setItem('userDetails', JSON.stringify(userExist));
          // console.log('User details:', userExist);
      })
      .addCase(requestLogin.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
      })
      .addCase(requestRegister.pending, (state) => {
            state.isLoading = true
          })
          .addCase(requestRegister.fulfilled, (state, action) => {
            state.isLoading = false
            alertSuccess(action.payload.message)
          })
          .addCase(requestRegister.rejected, (state, action) => {
            state.isLoading = false
            const errorMessage = action.payload
            alertError(errorMessage)
            state.error = errorMessage
          })
          .addCase(getUser.pending , (state)=>{
            state.isLoading = true
          })
          .addCase(getUser.fulfilled , (state,action)=>{
            state.list = action.payload
            state.isLoading = false
          })
          .addCase(getUser.rejected ,(state , action)=>{
            state.isLoading = false
          } )
      }
})

export const {login , logout} = userSlice.actions 

export default userSlice.reducer