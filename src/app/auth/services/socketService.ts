import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Manager, Socket, io } from "socket.io-client";
import { NewMessageDto } from "../interfaces/messageDto";
import { OnlineClient } from "../../shared/components/my-drawer/chat-component/interfaces/online.interface";


const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket!: Socket;
    manager!:Manager;
    constructor(){
        let token = localStorage.getItem('token');
        if(token==null) throw new Error()
       this.socket = io('http://localhost:3000' ,{
    extraHeaders:{
        authentication: token
    }})
       
    }

    requestConnected(){
         this.socket.emit("get_online");
    }

    getConnectedClients(callback:(online: OnlineClient[]) => void){
       
        this.socket.on("get_online" , callback)
    }

    sendMessage(message:NewMessageDto){
        console.log("se envía un mensaje")
        
        this.socket.emit('send_message_private', message )
    }

    onMessage(callback:(message:NewMessageDto)=>void){
        
        this.socket.on('send_message_private',callback)
        console.log(callback)
        
    }


}
