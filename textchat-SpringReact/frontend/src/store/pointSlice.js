import { createSlice } from '@reduxjs/toolkit'

let points = createSlice({
    name: 'points',
    initialState: {first: null, second: null,third:null,fourth:null,fifth:null},
    reducers: {
        setUser(state, action) {
            state.first = action.payload.first;
            state.second = action.payload.second;
            state.third = action.payload.third;
            state.fourth = action.payload.fourth;
            state.fifth = action.payload.fifth;
        }
    }
});

export let {setPoint} = points.actions

export default points;

