import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { connectToServer } from '../../../../socket-client';
import { AuthService } from '../../../auth/services/authService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import {UiService} from './uiService'
import { ChatComponent } from "./chat-component/chat-component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-my-drawer',
  imports: [RouterLink, Navbar, RouterOutlet, ChatComponent],
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



 }
