//Redux is a state management library
/*

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



export let lifeCycleOfPromise = createAsyncThunk("postsData", async()=>{


	let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
	let data=res.data;
	return data;

})


export const todoSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		addNewTodo: (state, action) => {
		state.push(action.payload);
		},
		deleteTodo: (state, action) => {
		state.pop();
		},
	},
	extraReducers: {
		[lifeCycleOfPromise.pending]:(state,action)=>{},
		[lifeCycleOfPromise.fulfilled]:(state,action)=>{
            console.log(action.payload)
        },
		[lifeCycleOfPromise.rejected]:(state,action)=>{}
	}
});
export let { addNewTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
*/