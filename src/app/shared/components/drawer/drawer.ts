import { AuthService } from './../../../auth/services/authService';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  authService = inject(AuthService) 

  home:Signal<string> = computed(() => {
    if(this.authService.isAdmin()){
      return 'admin'
    } else {
      return 'home'
    }
  });

  logout(){
    this.authService.logout()
  }
 }
