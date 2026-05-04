import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { AuthService } from '../../../auth/services/authService';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { UiService } from '../drawer/uiService';

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

 }
