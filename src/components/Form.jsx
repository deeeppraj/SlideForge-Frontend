import React, { useContext, useState } from "react";
import axios from 'axios';
import { globalContext } from "../Context/Global";



function Form(props) {

    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [slide, setslide] = useState(6)
    const [tg, settg] = useState('')
    const [tone, settone] = useState('')
    const [purpose, setpurpose] = useState('')
    const[globaldata,setGlobalData] = useContext(globalContext)
    


    async function createData(){
        const data = {
            title : title,
            description:desc,
            slide:slide,
            tg:tg,
            tone:tone,
            purpose:purpose
        }
        return data
    }

    async function getData(data) {
        const response = await axios.post('http://127.0.0.1:8000/generate/response',
        data = data)
        return response.data.content
        
    }

    async function getImage(){
      const url =  await  client.photos.search({ query, per_page: 1 })
      console.log(url)
    }



    async function submitHandler(e){
        e.preventDefault()
        console.log('form submitted')
        props.setstate('loader')
        const x =  await createData()
        settitle('')
        setdesc('')
        setslide(6)
        settg('')
        settone('')
        setpurpose('')
        const resp = await getData(x)
        setGlobalData(resp)

        setTimeout(()=>{
            props.setstate('preview')
        },100)
        

    }
  return (
    <div
      className="w-full 
                 bg-zinc-900/80 
                 border border-white/10 
                 p-5
                 max-h-[67.8vh]
                 rounded"
    >
      <form className="flex flex-col gap-4 text-white"
        onSubmit={submitHandler}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            Presentation Title
          </label>
          <input
            required
            type="text"
            placeholder="Enter your presentation title"
            className="h-10 rounded-lg px-4 bg-black 
                       border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       font-mono"
            value= {title}
            onChange={(elem)=>{
                settitle(elem.target.value)
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            Description
          </label>
          <textarea
            required
            placeholder="Describe what the presentation is about"
            rows={2}
            className="rounded-lg px-4 py-2 bg-black 
                       border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       font-mono resize-none"

            value= {desc}
            onChange={(elem)=>{
                setdesc(elem.target.value)
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            Number of Slides
          </label>
          <input
            required
            type="number"
            defaultValue={6}
            className="h-10 rounded-lg px-4 bg-black 
                       border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       font-mono"

            value= {slide}
            onChange={(elem)=>{
                setslide(elem.target.value)
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-300">
              Target Audience
            </label>
            <input
                required
              type="text"
              placeholder="Students, professionals, investors"
              className="h-10 rounded-lg px-4 bg-black 
                         border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         font-mono"
            value= {tg}
            onChange={(elem)=>{
                settg(elem.target.value)
            }}
            />
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-300">
              Tone
            </label>
            <input
                required
              type="text"
              placeholder="Formal, casual, persuasive"
              className="h-10 rounded-lg px-4 bg-black 
                         border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         font-mono"
                value= {tone}
            onChange={(elem)=>{
                settone(elem.target.value)
            }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-300">
            Purpose
          </label>
          <input
            required
            type="text"
            placeholder="Teaching, pitching, explaining"
            className="h-10 rounded-lg px-4 bg-black 
                       border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       font-mono"

            value= {purpose}
            onChange={(elem)=>{
                setpurpose(elem.target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-2 h-11 rounded-xl bg-blue-700 
                     hover:bg-blue-600 transition 
                     font-bold text-base"
        >
          Generate Presentation
        </button>

      </form>
    </div>
  );
}

export default Form;
