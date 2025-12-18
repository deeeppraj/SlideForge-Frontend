import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Create from './Pages/Create'
import Preview from './Pages/Preview'
import Loader from './Pages/Loader'
import { globalContext } from './Context/Global'





function App() {
  

  const [state, setstate] = useState('input')

  const [globdata, setdata] = useContext(globalContext)

  console.log(globdata);
  

  

  return (
    <div className="h-screen w-screen bg-black flex flex-col 
     overflow-hidden">
        <Navbar val={state} />

        <main className="flex overflow-y-auto  justify-center
        items-center-safe px-4 pt-2  w-full
        "> 
          {state == 'input' ? <Create setstate={setstate} /> : ''}

          {state == 'loader' ? <Loader /> : ''}

          { state == 'preview' ? <Preview /> : ""}

          
         </main>


        <Footer />
      </div>


  )
}

export default App