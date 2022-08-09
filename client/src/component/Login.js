import React from 'react'
import { useContext } from 'react'
import annex from './Context'
import { useNavigate } from 'react-router-dom';

function Login() {

const {name,setname,setroom,room,handlechange}=useContext(annex);
const nav=useNavigate();

  return (
    
   <>
   <div className='flex justify-center item-center mt-20'>

   
   <div className='bg-green-500 shadow-2xl shadow-gray-800'>
   
   <div className='p-10' >
   
   

   
  
   <h1 className='font-bold text-gray-800 text-6xl mb-10'>Join chat</h1>
     
   
   <div className='flex-col mb-10'>
   <input onChange={(e)=>{setname(e.target.value)}} value={name} className='w-80 shadow-xl h-10 px-5 text-xl rounded-lg focus:border-2 border-black ' type="text" placeholder='Username' />
   
   </div>
   <div>
   <input onChange={(e)=>{setroom(e.target.value)}} value={room} className='w-80 shadow-xl h-10 px-5 text-xl rounded-lg focus:border-2 border-black mb-10 ' type="text" placeholder='Room' />
   </div>

   <div className='px-5 py-2 bg-gray-800 rounded-xl hover:border-2 border-white cursor-pointer'  onClick={()=>{handlechange(nav('/chat'))}}   >
   <button   className='text-2xl text-white font-semibold  '>Submit</button>
   </div>
   <h2 className='font-bold   text-gray-800 font-sans text-center mt-5'>@Copy right Annex Chat App</h2>
   
   </div>
   </div>
   </div>
   </>
  )
}

export default Login