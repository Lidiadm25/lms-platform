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

  home:Signal<string> = computed(() => this.establishRoutes());
  
  establishRoutes(){
    if(this.authService.isAdmin()){
      console.log("admin")
     return 'admin'
    }
    console.log("no")
    return ''
  }

  logout(){
    this.authService.logout()
  }
 }
