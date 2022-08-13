import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Socket } from "socket.io-client";
import annex from "./Context";

function Chat({ socket }) {
  const [Messagelist, setMessagelist] = useState([]);
  const [text, settext] = useState("");
  const [currnetmessage, setcurrnetmessage] = useState("");
  const { name, setname, setroom, room, handlechange } = useContext(annex);
  const [fonttheme, setfonttheme] = useState("");
  const [read, setread] = useState(false);

  const [mtheme, setmtheme] = useState({
    color: "black",
    fontFamily: "monospace"

  })

  const [btntheme, setbtntheme] = useState({


    color: "#161515",
    background: "rgb(92 176 245)",
    fontFamily: "monospace"
  })

  const [mode, setmode] = useState("dark")


  const modetheme = () => {

    if (mode == "white") {

      setmode("dark")


      setmtheme({
        color: "black",
        fontFamily: "monospace"
      })

      setbtntheme({
        color: "#161515",
        background: "rgb(92 176 245)",
        fontFamily: "monospace"
      })


      document.body.style.backgroundColor = "white"



    }
    else {
      setmode("white")
      document.body.style.backgroundColor = "#101523"
      setmtheme({
        color: "#7fabc7",
        fontFamily: "cursive"

      })

      setbtntheme({

        color: "white",
        background: "#1d3b4c",
        fontFamily: "cursive"

      })
    }
  }

  const newmessage = async () => {
    if (currnetmessage !== "") {
      const messag = {
        room: room,
        message: currnetmessage,
        username: name,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setTimeout(() => {
        
        socket.emit("send_message", messag);
        setread(true);

      }, 5000);
      
      
      
      
     
      setMessagelist((list) => [...list, messag]);
      setcurrnetmessage("")
      
     
    }
  };

  useEffect(() => {

   
    



      socket.off("recieved").on("recieved", (block) => {
        console.log(block);
        setread(false);

        setMessagelist((list) => [...list, block]);
       
        
       
        
      });
      
 

      
     
      


      
   


   



  }, [socket]);




  return (
    <>
      <div className=" flex justify-center item-center mt-20 "  >
        <div className="flex items-start mt-10 mr-20">
          <div className="" style={mtheme}>
            <div>
              <h1 className=" text-9xl font-semibold hidden md:inline-block">Annex 4u</h1>
            </div>

            <div className="box px-5 py-1 bg-red-500 mt-5 rounded-md">



            </div>

            <div className="flex justify-start mt-5 w-96 ">
              <div>
                <h1 className="flex justify-start text-2xl ">
                  Welcome to Annex ChatApp
                </h1>
                <div className="mt-5 text-xm text-justify">

                  <h1>Go to dark mode and get amazing experience</h1>
                </div>
                <div className="mt-5 flex justify-start text-xm">

                  <h1>Vaghela Ajitkumar 👨‍💻</h1>
                </div>
              </div>

            </div>

            <div className="flex justify-start mt-5 font-semibold" >

              <div className=" text-2xl" >
                <button>change mode :</button>

              </div>
              <div className=" ml-5 box bg-pink-500 px-4 py-1 rounded-lg " style={btntheme}>
                <button onClick={modetheme} className="text-xl">{mode}</button>

              </div>



            </div>

          </div>
        </div>

        <div className="px-10  ">
          <div className=" box w-80 h-96 border-8 border-green-500  snap-y snap-screen overflow-y-auto  ">
            <div className="mt-5  ">
              {Messagelist.map((dat, id) => {
                return (
                  <div>
                    <div
                      className={
                        name === dat.username
                          ? "flex justify-end item-center  mb-5 mr-5 "
                          : "flex justify-start item-center mb-5 ml-5"
                      }
                    >
                      <div
                        className={
                          name === dat.username
                            ? "box flex items-end justify-between shadow-xl  bg-green-500 px-3 py-2 rounded-lg "
                            : "box flex items-end   justify-between bg-sky-500 px-3 py-2 rounded-lg "
                        }
                        style={btntheme}
                      >
                        <h1 className="text-xl mr-2" key={id}>
                          {dat.message}
                        </h1>
                        <div className="" style={{ fontSize: "10px" }}>
                          {dat.time}
                        </div>

                        {read &&
                        
                          <div className="ml-2" style={{ fontSize: "2px" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                          </div>
                        }
                       


                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center item-center box border-l-8 border-r-8   border-green-500 ">
            <div className="mt-5 mb-5 " >
              <input style={btntheme}
                className="border-4 border-green-700 placeholder:text-gray-500  px-5 py-2"
                type="text"
                placeholder="message"
                onChange={(e) => {
                  setcurrnetmessage(e.target.value);
                }}
                value={currnetmessage}
              />
            </div>
          </div>
          <div className="box px-5 py-2 bg-sky-500 hover:border-4 border-red-500 cursor-pointer " style={btntheme} onClick={newmessage}>
            <button >send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
