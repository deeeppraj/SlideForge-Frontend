import React, { useContext } from 'react'
import Leftsidebar from '../components/Leftsidebar'
import { globalContext } from '../Context/Global'
import Currentcard from '../components/Currentcard'

function Preview() {
    const[globaldata,setglobaldatat] = useContext(globalContext)


  return (
    <div className='h-full w-full flex gap-10'>
        <Leftsidebar />
        <div className='flex  flex-col h-[92%] w-full overflow-auto
        border-red-500 pb-5'>
           <Currentcard />
        </div>
    </div>
  )
}

export default Preview