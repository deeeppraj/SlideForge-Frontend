import React from 'react'

function FormHeader() {
  return (
    <div>
        <div className='p-2 flex gap-1 items-center
        border-b border-white/12'>
            <img src="/icon.png" alt="my-logo" 
            className='h-20 w-22 z-auto rounded'/>

            <div className='flex flex-col font-mono'>
                <h3 className='font-serif font-extrabold text-2xl'>
                Create Your Presentation
                </h3>

                <p className='text-sm text-gray-400'>
                    Fill out the details below to generate a custom presentation
                </p>
            </div>
        </div>
    </div>
  )
}

export default FormHeader