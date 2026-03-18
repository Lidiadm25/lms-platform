import { AuthService } from './../../../auth/services/authService';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  authService = inject(AuthService) 
  logout(){
    this.authService.logout()
  }
 }
