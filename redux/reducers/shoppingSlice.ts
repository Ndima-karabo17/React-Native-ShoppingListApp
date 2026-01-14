import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  id: number;
  name: string;
  qty: string;
  checked: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
}

const initialState: ShoppingState = {
  items: [
    { id: 1, name: "Bananas", qty: "3 bunch", checked: false },
    { id: 2, name: "Milk Organic Eggs", qty: "3 dosh", checked: false },
    { id: 3, name: "Bell Peppers", qty: "2 units", checked: false },
  ],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ name: string; qty: string }>) => {
      const newItem: ShoppingItem = {
        id: Date.now(),
        name: action.payload.name,
        qty: action.payload.qty,
        checked: false,
      };
      state.items.push(newItem);
    },
    updateItem: (state, action: PayloadAction<{ id: number; name: string; qty: string }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].name = action.payload.name;
        state.items[index].qty = action.payload.qty;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },
  },
});

export const { addItem, updateItem, deleteItem, toggleItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;