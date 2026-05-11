import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Manager, Socket, io } from "socket.io-client";
import { NewMessageDto } from "../interfaces/messageDto";
import { OnlineClient } from "../../shared/components/my-drawer/chat-component/interfaces/online.interface";
import { Observable } from "rxjs";


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

    disconnect(){
        if(this.socket) this.socket.disconnect()
    }

    requestConnected(){
         this.socket.emit("get_online");
    }

    getConnectedClients(): Observable<OnlineClient[]>{
       return new Observable(observer => {
        this.socket.on('clients-updated', (clients: OnlineClient[])=> {
            console.log("SE RECIBEN CLIENTES")
            observer.next(clients)
        })
       })
    }

    sendMessage(message:NewMessageDto){
      
        this.socket.emit('send_message_private', message )
    }

    onMessage(){
        return new Observable(observer => {
            this.socket.on('receive_private_message', (data)=> { 
                console.log("SE RECIBE UN MENSAJE")
                observer.next(data)
            })
        })
        
       
        
    }


}
