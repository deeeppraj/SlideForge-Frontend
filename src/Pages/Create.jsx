import React from 'react'
import FormHeader from '../components/FormHeader'
import Form from '../components/Form'

const Create = (props) => {
  return (
    <div className='border border-white w-[80%] 
    text-white rounded-lg flex flex-col'>

        <FormHeader />

        <Form setstate={props.setstate} />

        


    </div>
  )
}

export default Create