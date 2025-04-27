import { createSlice } from '@reduxjs/toolkit'
import toast  from 'react-hot-toast';


const initialState = {
  pastes : localStorage.getItem("pastes") ? 
  JSON.parse(localStorage.getItem("pastes")) : [], 
  // localStorage only stores Strings, so we need to parse it to an Object/Array i.e we use JSON.parse
  // this is used to retain the data even after refreshing the page.
}

export const PasteSlice = createSlice({
  name: 'Paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
     
     const pasteData =  action.payload;
     state.pastes.push(pasteData);
     localStorage.setItem("pastes", JSON.stringify(state.pastes))
     toast.success("Paste Created Successfully")
     
      
    },
    updateToPastes : (state, action) => {
      const pasteData =  action.payload;
      const index = state.pastes.findIndex((item) => item._ID === pasteData._ID) 
      // findIndex ka default behavior hai:  "Agar kuch nahi mila, to -1 dedo."

      // Alternative way to do above

      // state.pastes = state.pastes.map((item) =>  item._ID === pasteData._ID ? pasteData : item  ); 
      // localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // here we are using map to iterate over the array and update the pasteData if the _ID matches, else return the item as it is.
 
     
      if(index >= 0){
        state.pastes[index] = pasteData;
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Updated Successfully")
      }
      
      

    },
    removeFromPastes: (state, action) => {
      const pasteID = action.payload;
      const index = state.pastes.findIndex((item) => item._ID === pasteID)
      if(index >= 0){
        state.pastes.splice(index, 1); // splice is used to remove the item from the array at the given index.
        // here we will start from "index" and remove 1 item from the array.

        // alternative way to do above

        // const existingPaste = state.pastes.find((item) => item._ID === pasteID);
        // if (existingPaste) {  state.pastes = state.pastes.filter((item) => item._ID !== pasteID);
        //      localStorage.setItem("pastes", JSON.stringify(state.pastes)); }
 
        // NOTE : map() elements ko modify karta hai, delete nahi. Deletion ke liye filter() zyada better and recommended hai.
        //          and for updation map() is better.
  
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Deleted Successfully")
      }
      else{
        toast.error("Paste Not Found")
      }
    },

    resetAllPastes: (state, ) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Deleted Successfully")
  },
}
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes} = PasteSlice.actions

export default PasteSlice.reducer