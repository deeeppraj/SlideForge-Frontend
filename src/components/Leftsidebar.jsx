import React from 'react'
import Currentcard from './Currentcard'
import SidebarPreview from './SidebarPreview'



function Leftsidebar() {

   
  return (
    <div className='h-[91%] w-[30%] border border-white/10
    rounded-lg bg-gray-950 overflow-auto'>

        <div className='p-2 flex flex-col gap-3 '>
            <SidebarPreview />
        </div>

    </div>
  )
}

export default Leftsidebar