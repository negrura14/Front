import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:[],
        detail:[],
        filter: []
    },
    reducers:{
        getAllGame: (state, action) => {
            state.game = action.payload
        },
        getGameById: (state,action) => {
            state.detail = action.payload
        },
        getGameByName: (state, action) => {
            state.detail = action.payload
        },
        filterGames: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const {getAllGame, getGameById, getGameByName, filterGames} = gameSlice.actions

export default gameSlice.reducer