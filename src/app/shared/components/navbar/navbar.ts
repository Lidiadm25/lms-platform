import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './../../../auth/services/authService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  authService = inject(AuthService) 
  
  home:Signal<string> = computed(() => this.establishRoutes());
  
  establishRoutes(){
    if(this.authService.isAdmin()){
     return 'admin'
    }
    return 'home'
  }
 }
