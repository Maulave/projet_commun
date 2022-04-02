import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchAnnonces = createAsyncThunk(
    'annonces/fetch',
    async ({object}) => {

        const req = await fetch(`http://localhost:5000/annonces`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        })
        return await req.json();
    }
)


const annoncesSlice = createSlice({
    name: 'annonces',
    initialState: {
        loading: false,
        error: null,
        buttonLeft : false,
        selected: 0,
        data: [],
    },
    reducers: {
        setSlideLeftButton: (state, action) => {
            state.buttonLeft = action.payload
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        }
    },
    extraReducers: {
        [fetchAnnonces.pending]: (state) => {
            state.loading = true;
            state.error = null
            
        },
        [fetchAnnonces.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            /* console.log(action.payload) */
        },
        [fetchAnnonces.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});

export const { setSelected } = annoncesSlice.actions;
export const { setSlideLeftButton } = annoncesSlice.actions;

export default annoncesSlice.reducer;