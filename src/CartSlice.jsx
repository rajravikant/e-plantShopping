import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCartAmount:0,
    totalItemsInCart:0 
  },
  reducers: {
    addItem: (state, action) => {
      const {name,cost,image} = action.payload;
      const index = state.items.findIndex(item => item.name === name);
      if(index === -1){
        state.items.push({name,cost,image,quantity:1});
        state.totalCartAmount += cost;
        state.totalItemsInCart++;
      }
      else{
        state.items[index].quantity++;
        state.totalCartAmount += cost;
        state.totalItemsInCart++;
      }
      
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload.name);
      state.items.splice(index, 1);
      state.totalCartAmount = state.items.reduce((acc, item) => acc + item.cost * item.quantity, 0);
      state.totalItemsInCart = state.items.reduce((acc, item) => acc + item.quantity, 0);
      
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload.name);
      state.items[index].quantity = action.payload.quantity;
      state.totalCartAmount = state.items.reduce((acc, item) => acc + item.cost * item.quantity, 0);
      state.totalItemsInCart = state.items.reduce((acc, item) => acc + item.quantity, 0);

    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
