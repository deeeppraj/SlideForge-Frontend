import React, { createContext, useState } from 'react'

export  const globalContext = createContext()

function Global(props) {

    const [data, setdata] = useState({
      slide:[],
      active:''
})


  return (
    <div>
        <globalContext.Provider value={[data,setdata]}>
            {props.children}
        </globalContext.Provider>
    </div>
  )
}

export default Global