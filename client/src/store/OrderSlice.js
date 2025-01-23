import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertError, alertSuccess } from "../feedback.js/feddback";


export const requestCreatingOrder = createAsyncThunk('order/requestCreatingOrder',
    async ({ formData, navigate }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/order`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            navigate(`/order/${res.data.order._id}`)
            return res.data
        } catch (error) {
            const errorMessage = extractErrorMessage(error)
            return rejectWithValue(errorMessage)
        }
    })

export const OrderSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        isLoading: false,
        error: null,
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(requestCreatingOrder.pending, (state) => {
                state.isLoading = true,
                state.error = null
            })
            .addCase(requestCreatingOrder.fulfilled , (state,action)=>{
                state.list = action.payload 
                console.log("orderslice :"+state.list);
                state.isLoading = false 
                alertSuccess(action.payload.message)
            
            })
            .addCase(requestCreatingOrder.rejected, (state, action) => {
                state.isLoading = false
                const errorMessage = action.payload
                alertError(errorMessage)
                state.error = errorMessage
            })
    }
})

export default OrderSlice.reducer