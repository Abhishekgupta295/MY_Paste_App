import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../Redux/Slices/PasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const AllPastes = () => {

  const AllPastesData = useSelector((state) => state.Paste.pastes) // Getting all pastes from redux store,
  //  "Paste" = slice name, "pastes" = initial value of the slice
  console.log(AllPastesData);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = AllPastesData.filter((data) => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
 // Filterdata will contain all the pastes whose title includes the search term

 function handleDelete (pasteID) {
  dispatch(removeFromPastes(pasteID))
 }
  return (
    <div>

      <input 
        type='search'
        placeholder='Search Your Paste Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='p-2 rounded-2xl min-w-[600px] mt-5 text-black'
      />

      <div>
        {
          filteredData.length > 0 ?
          (
            filteredData.map((data) =>
              {
                return (<div className='border mt-4' key={data._ID}>
                           <div>
                             {data.title}
                           </div>
                           <div>
                             {data.content}
                           </div>
                           <div className='flex flex-row gap-4 mt-4'>
                              
                              <NavLink to={`/?pasteID=${data._ID}`}>
                                 <button>Edit</button>
                              </NavLink>

                              <NavLink to={`/pastes/${data._ID}`}>
                                <button>View</button>
                              </NavLink>
                              
                              <button onClick={ () => handleDelete(data._ID)}>Delete</button>
                              <button
                               onClick={ () => {navigator.clipboard.writeText(data.content);
                               toast.success("Copied Successfully")}}
                               >Copy</button>
                              <button>Share</button>
                           </div>
                           <div>
                            {data.createdAt}
                           </div> 
                       </div>)
              }
            )
        ) : 
          (<div>
            NO PASTE FOUND
          </div>)
        }
      </div>

    </div>
  )
}

export default AllPastes