import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertError , alertSuccess } from "../feedback.js/feddback";


export const fetchArticles = createAsyncThunk('articles/fetchArticles' , async()=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles`)
    return res.data
    }
    )
  
export const search = createAsyncThunk('articles/search', async(query , {rejectWithValue})=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/search`,{params: {query}})
    // console.log(res.data)
    return res.data
  }catch(err){
    const errorMessage = extractErrorMessage(err);
      return rejectWithValue(errorMessage);
  }
})
  
export const filtrerByPrix = createAsyncThunk('articles/sort', async()=>{

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/sort`)
    return res.data
})

export const filtrerByPrixAc = createAsyncThunk('articles/sortAc', async()=>{

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/sortAc`)
    return res.data
})
export const pagination = createAsyncThunk('articles/pagination', async(page , nbart, OrderBy)=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/pagination?page=${page}&nbart=${nbart}&OrderBy=${OrderBy}`,
    {params: {page ,nbart,OrderBy} })
  return res.data
})

export const fetchArticlesById = createAsyncThunk('articles/fetchArticlesById', async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`)
    return res.data
})
export const requestCreatingArticle = createAsyncThunk('articles/requestCreatingArticle',
    async({ formData, navigate },{rejectWithValue}) =>{
        try {
            const token = localStorage.getItem("token")
            // console.log(token)
            
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/articles`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                  }
                },
              )
              // console.log(res.data)
              navigate('/dashboard')
              return res.data
              } catch (error) {
                const errorMessage = extractErrorMessage(error)
                return rejectWithValue(errorMessage)
                }
                })
export const requestUpdatingArticle = createAsyncThunk(
            'articles/requestUpdatingItem',
            async ({ id, data, navigate }, { rejectWithValue }) => {
              try {
                const token = localStorage.getItem("token")
                const res = await axios.put(
                  `${import.meta.env.VITE_API_URL}/articles/${id}`,
                  data,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
                )
                navigate(`/articles/${id}`)
                return res.data
              } catch (error) {
                const errorMessage = extractErrorMessage(error)
                return rejectWithValue(errorMessage)
              }
})        
export const requestDeletingArticle = createAsyncThunk(
  'articles/requestDeletingArticle',
  async ({ id, closeModal }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      closeModal();
      // return {id}
      return res.data; 
      // console.log(res.data)
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const articleSlice = createSlice({
    name: 'articles',
    initialState:{
        list: [],
        isLoading: false ,
        error: null ,
        selected: null ,
        totalItems: 0,
        page: 1,
        nbart: 8,
        nbPage: 1,
        OrderBy: 'asc',
        searchResults: []
    },
    reducers : { },
    extraReducers: (builder)=> {
    builder
    .addCase(fetchArticles.pending , (state)=>{
        state.isLoading = true ,
        state.error = null ;
    })
    .addCase(fetchArticles.fulfilled, (state,action)=>{
        state.isLoading = false ,
        state.list = action.payload
        
    })
    .addCase(fetchArticles.rejected , (state, action)=>{
        state.isLoading = false 
        state.error = action.error.message 
    })
    .addCase(requestCreatingArticle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestCreatingArticle.fulfilled, (state, action) => {
        state.isLoading = false
        // state.list.push(action.payload)
        state.list.unshift(action.payload.Article);
        alertSuccess(action.payload.message)
      })
      .addCase(requestCreatingArticle.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
      .addCase(fetchArticlesById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchArticlesById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selected = action.payload
        
      })
      .addCase(fetchArticlesById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(requestUpdatingArticle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestUpdatingArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.map(element => element._id === action.payload._id ? action.payload : element)
        alertSuccess(action.payload.message)
      })
      .addCase(requestUpdatingArticle.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
      .addCase(requestDeletingArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestDeletingArticle.fulfilled, (state, action) => {
        state.isLoading = false;

          state.list = state.list.filter(article => article._id !== action.payload.id);
      })
      .addCase(requestDeletingArticle.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        alertError(errorMessage);
        state.error = errorMessage;
      })
      .addCase(search.pending , (state)=>{
        state.isLoading = true 
        state.error = null
      })
      .addCase(search.fulfilled , (state,action)=>{
        state.isLoading = false 
        state.searchResults = action.payload
        console.log("Updated searchResults:", state.searchResults);
      })
      .addCase(search.rejected, (state , action)=>{
        state.isLoading = false 
        state.error = action.payload
      })
      .addCase(filtrerByPrix.pending , (state)=>{
        state.isLoading = true 
        state.error = null 
      })
      .addCase(filtrerByPrix.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.list = action.payload
      })
      .addCase(filtrerByPrix.rejected , (state , action)=>{
        state.isLoading= false 
        state.error = action.payload
      })
      .addCase(filtrerByPrixAc.pending , (state)=>{
        state.isLoading = true 
        state.error = null 
      })
      .addCase(filtrerByPrixAc.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.list = action.payload
      })
      .addCase(filtrerByPrixAc.rejected , (state , action)=>{
        state.isLoading= false 
        state.error = action.payload
      })
      .addCase(pagination.pending, (state) => {
        state.isLoading = true
      })
      .addCase(pagination.fulfilled, (state, action) => {
        state.isLoading = false
        state.page = action.payload.page
        state.nbart = action.payload.nbart
        state.OrderBy = action.payload.OrderBy  
        state.list = action.payload.artlicle
        state.arts = action.payload.arts
        state.nbPage = action.payload.nbPage 
      })
      .addCase(pagination.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message;
      });
    }
    

})  
export default articleSlice.reducer