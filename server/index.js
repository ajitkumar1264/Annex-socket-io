const express=require('express');
const app = express();
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');

app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket)=>{
    console.log(`user connecteed with : ${socket.id} `);


        socket.on("join_room",(data)=>{
            socket.join(data);
            console.log(`user join room with : ${data}`);
        });
        
            socket.on("send_message",(date)=>{

               const kar=date;
               console.log(kar);
               socket.to(kar.room).emit("recieved",kar);
              

            });

           
            
    socket.on('disconnect', ()=>{console.log('user disconnect from')});

});


server.listen(3001,()=>{
console.log('server listening on port 3001');
}
)