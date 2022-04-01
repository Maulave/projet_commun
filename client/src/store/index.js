import { configureStore } from '@reduxjs/toolkit';
import annonces from './annoncesSlice';
import app from './appSlice';



export const store = configureStore({
    reducer: {
        annonces,
        app
    } 
});