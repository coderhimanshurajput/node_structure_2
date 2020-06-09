'use strict';

const dateTime = require("simple-datetime-formater");
const User = require('../../src/controllers/user');

let user = [];
let onlineUser = [];

class SocketIo {
    static async socketConnection (scoket){

        socket.on("connection", socket => {
            console.log('Socekt :', socket.id )
            user.push(socket);
            console.log("user connected" , user.length);
            socket.on("disconnect", function() {
                user.splice(user.indexOf(socket),1)
                console.log("user disconnected", user.length);
            });
            socket.on('new user' , (data) =>{
                socket.username = data;
                onlineUser.push(socket.username);
                console.log('New user Connect ', socket.username);
                updateuser()
            })
            let updateUser = () =>{
                socket.on('get user', () =>{
                    socket.emit(onlineUser);
                })
            }
            socket.on('userConnected', socket.join);
            socket.on('userDisconnected', socket.leave);


            //Someone is typing
            socket.on("typing", data => {
                console.log('=====', data)
                socket.broadcast.emit("notifyTyping", {
                    user: data.user,
                    message: data.message
                });
            });

            //when soemone stops typing
            socket.on("stopTyping", () => {
                socket.broadcast.emit("notifyStopTyping");
            });

            socket.on("chat message", function(msg) {
                console.log("message: ", msg);

                //broadcast message to everyone in port:5000 except yourself.
                socket.broadcast.emit("received", { message: msg });
                User.SaveChat({message:msg, sender: 'New'})
            });
        });

    }

}

module.exports = SocketIo;
