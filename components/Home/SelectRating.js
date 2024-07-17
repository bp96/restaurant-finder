import Data from '@/Shared/Data'
import React, { useState } from 'react'

// component for selecting the rating of businesses which gets passed onto page.js
function SelectRating({onRatingChange}) {
    const [selectedRating,setSelectedRating]=useState([]);

    const onSelectRating=(isChecked,value)=>{
        if(isChecked)
        {
            setSelectedRating([...selectedRating,value]); // in case multiple checkboxes ticked, aggregate them together in the array
        }
        else{
            setSelectedRating(selectedRating.filter((n)=>n!==value));
        }
      
        onRatingChange(selectedRating) // send value of selectedRating back to the parent SelectRating function in page.js
    }
  return (
    <div className='px-2 mt-5'>
        <h2 className='font-bold'>Select Rating</h2>
        <div>
            {Data.ratingList.map((item,index)=>(
                <div key={index} className='flex justify-between'>
                    <label>{item.icon}</label>
                    <input type='checkbox'
                    onChange={(e)=>onSelectRating(e.target.checked,item.name)}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectRating