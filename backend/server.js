const express = require('express');
const usersRoute = require('./routes/usersRoute');
const articlesRoute = require('./routes/articlesRoute');
const picturesRoute = require('./routes/picturesRoute');
const videosRoute = require('./routes/videosRoute');
const discussionRoute = require('./routes/discussionRoute');
require('./config/dbConnect')();
const cors = require("cors");


const app = express();

app.use(express.json())

app.use(cors());

//ROUTES(END POINT)
app.use('/api/users', usersRoute)


app.use('/api', articlesRoute)

app.use('/api', picturesRoute)

app.use('/api', videosRoute)

app.use('/api', discussionRoute)





//SERVER
const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>{
    console.log(`Server is up and running ${PORT}`)
})



const http = require('http');



const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  const { addUser, removeUser } = require("./chat-user");
  
  const CHATPORT = 5000;
  
  io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callBack) => {
      const { user, error } = addUser({ id: socket.id, name, room });
      if (error) return callBack(error);
  
      socket.join(user.room);
      socket.emit("message", {
        user: `${user.name}`,
        text: `Welocome to ${user.room}`,
      });
  
      socket.broadcast
        .to(user.room)
        .emit("message", { text: `${user.name} has joined!` });
      callBack(null);
      socket.on("sendMessage", ({ message }) => {
        io.to(user.room).emit("message", {
          user: user.name,
          text: message,
        });
      });
    });
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      console.log(user);
      io.to(user.room).emit("message", {
        user: `${user.name}`,
        text: `${user.name} just left the room`,
      });
      console.log("A disconnection has been made");
    });
  });
  
  server.listen(CHATPORT, () => console.log(`Chat server is connected to Port ${CHATPORT}`));