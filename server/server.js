const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const mongoose = require('mongoose');

const cors = require("cors");
app.use(cors());

app.use(express.json()); 

require ("dotenv").config();
const mongoserver = process.env.mongo2;
mongoose.connect('mongodb+srv://'+mongoserver);
const UserData={
    uid:String,
    name:String,
    picture:String
}

const room= {
    room: String,
    users:[UserData]
}

const RoomModel= new mongoose.model("users",room);

const path = require("path");

const users = {};
const users2={};


const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", async (roomID) => {
        console.log(roomID);
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        console.log(users[roomID]);
        

        socketToRoom[socket.id] = roomID;


        


        

        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    app.post('/:roomID',async (req,res)=>{
        const roomID2= req.params.roomID;
        
        if(users2[roomID2])(
            users2[roomID2].push({
                uid:req.body.uid,
                name:req.body.name,
                picture:req.body.picture
            })
        )
        else{
            users2[roomID2] = [{
                uid:req.body.uid,
                name:req.body.name,
                picture:req.body.picture
            }];
        }
        

        const userdet= {
            room: roomID2,
            users:users2[roomID2]

        }
       
        const found = await RoomModel.findOneAndUpdate({room:roomID2},{
            room: roomID2,
            users:users2[roomID2]
        },{overwrite :true})

        if(!found){
            const newroom= RoomModel(userdet);
            await newroom.save();
        }
    
        res.send("Done");
    })
    app.get('/:roomID',async (req,res)=>{
       
        const roomid= req.params.roomID;
        console.log(roomid);
        const found= await RoomModel.findOne({room:roomid});
        if(found){
            console.log(found);
        }
    
        res.send(found);
    })

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });


   

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left',socket.id)
    });

    socket.on('change', (payload) => {
        socket.broadcast.emit('change',payload)
    });

});




const PORT = process.env.PORT || 8000
if(process.env.PROD){
    app.use( express.static(__dirname + '/client/build'));
    app.get('*', (request, response) => {
	    response.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

server.listen(process.env.PORT || 8000, () => console.log('server is running....'));


