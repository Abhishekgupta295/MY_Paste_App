import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateToPastes, addToPastes } from '../Redux/Slices/PasteSlice'


const Home = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [searchParam, setSearchParam] = useSearchParams()
  const pasteID = searchParam.get("pasteID")
  const dispatch = useDispatch()
  const AllPastesData = useSelector((state) => state.Paste.pastes)

  useEffect(()=>{
    if(pasteID){
        console.log(" inside useeffect and  pasteID", pasteID)
        const pasteData =  AllPastesData.find((data) => (data._ID === pasteID));
        console.log("pasteData found i.e ", pasteData)
        setTitle(pasteData.title);
        setContent(pasteData.content);
        
        
      }
    
  },[pasteID, AllPastesData])

  function CreatePaste (){
    const pasteData = {
      title : title,
      content : content,
      _ID : pasteID || Date.now().toString(36) ,
      createdAt : new Date().toISOString()
    }

    if(pasteID){
      //Update Paste
      dispatch(updateToPastes(pasteData))
    }
    else{
      //Create Paste
      dispatch(addToPastes(pasteData))
    }
    
    // Clear the input fields after creating or updating a paste
    setTitle("")
    setContent("")
    setSearchParam({})

  }

  return (
    <div className='h-screen bg-blue-950'>
        <div className='flex flex-row gap-7 place-content-between'>
            <input
            className='p-1 rounded-2xl mt-2 pl-4 w-[66%] text-black'
            type = "text"
            placeholder='Enter Paste Title Here'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <button 
              className='bg-indigo-200 p-2 rounded-2xl mt-2 text-black'
              onClick={CreatePaste}
            >
              {
                pasteID ? "Update MY Paste" : "Create MY Paste"
              }
            </button>
        </div>

        <div className='mt-8'>
          <textarea
            className='rounded-2xl mt-4 p-4 min-w-[500px] bg-blue-100  text-black'
            value={content}
            placeholder='Enter Paste Content Here'
            onChange={(e) => setContent(e.target.value)}
            rows={30}
          />
        </div>
    </div>
  )
}

export default Home