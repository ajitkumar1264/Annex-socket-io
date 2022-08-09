import io from 'socket.io-client';
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './component/Login';
import Chat from './component/Chat';
import annex from './component/Context'


const socket=io.connect('http://localhost:3001/');

function App() {


  const [name, setname] = useState("");
  const [room, setroom] = useState("");


  const handlechange=()=>{

    if(name != "" && room != "")
    {
      
      socket.emit("join_room",room);
      

    }


  }


  


  return (
    <>
    <annex.Provider value={{name,setname,setroom,room,handlechange,socket}}>
    <div className="App">
   
   
    <BrowserRouter>
     <Routes>
    
     <Route  path="/" element={<Login/>}/>
     <Route path='/chat' element={<Chat socket={socket}/>}/>
     
     </Routes>
     </BrowserRouter>
    </div>
    </annex.Provider>
    </>
  );
}

export default App;
