import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mpID: '',
    order: {
        ID: '',
        items: [],
        status: '',
        status_detail: '',
        total: 0,
    },
    items: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers:{
        setPayment: (state, action) => {
            state.mpID = action.payload.mpID;
        },
        clearPayment: (state) => {
            state.mpID = '';
            state.order = {
                ID: '',
                items: [],
                status: '',
                status_detail: '',
                total: 0,
            };
            state.items = [];
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload.map((i) =>{
                return{
                    id: i.ID,
                    unitPrice: i.price,
                    imgUrl: i.image,
                    quantity: 1,
                    title: i.title, //* verificar que no sea name
                }
            })
        }
    }
});

export const {setPayment, clearPayment, setOrder, setItems } = checkoutSlice.actions;

export default checkoutSlice.reducer;