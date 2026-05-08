import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }
 chat = signal<boolean>(false);
  
  collapsed = signal<boolean>(true);

  toggleDrawer(){
    console.log(this.collapsed())
    let check = document.getElementById('my-drawer-1') as HTMLInputElement
    check.checked = this.collapsed();

    console.log("SE HA CAMBIADO EL CHECK")
  }

  isCollapsed(){
    console.log(this.collapsed())
    this.collapsed.set(true);
  }

  notCollapsed(){
    console.log(this.collapsed())
    this.collapsed.set(false);
  }

  
  chatToggle(){
   
    this.chat.update((v)=> !v)
  
  }

  hideChat(){
    this.chat.set(false);
  }

}
