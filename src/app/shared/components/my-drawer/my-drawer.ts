import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { connectToServer } from '../../../../socket-client';
import { AuthService } from '../../../auth/services/authService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import {UiService} from './uiService'

@Component({
  selector: 'app-my-drawer',
  imports: [RouterLink, Navbar, RouterOutlet],
  templateUrl: './my-drawer.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDrawer {
    uiService = inject(UiService)
   authService = inject(AuthService)
  home:Signal<string> = computed(() => {
    if(this.authService.isAdmin()){
      return 'admin'
    } else {
      return 'home'
    }
  });


  connect(){
    let token =    localStorage.getItem('token')
    if(token)  connectToServer(token);
  
  }

 }
