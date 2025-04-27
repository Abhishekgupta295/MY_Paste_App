import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams(); // Get the ID from the route parameters
  const AllPastesData = useSelector((state) => state.Paste.pastes); // Get all pastes from Redux state

  // Convert id to a number if _ID in your state is a number
  const pasteToView = AllPastesData?.find((data) => data._ID === id);

  console.log("PasteToView found i.e ", pasteToView);

  // Conditional rendering to handle the case where pasteToView is undefined
  if (!pasteToView) {
    return (
      <div className='h-screen bg-blue-950 flex justify-center items-center'>
        <p className='text-white text-lg'>Paste not found!</p>
      </div>
    );
  }

  // Destructure title and content from the found paste
  const { title, content } = pasteToView;

  return (
    <div className='h-screen bg-blue-950'>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl mt-2 pl-4 w-[66%] text-black'
          type="text"
          placeholder='Enter Paste Title Here'
          value={title || ''} // Ensure value is not undefined
          disabled={true}
        />
      </div>

      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 p-4 min-w-[500px] bg-blue-100 text-black'
          value={content || ''} // Ensure value is not undefined
          placeholder='Enter Paste Content Here'
          rows={30}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default ViewPaste;