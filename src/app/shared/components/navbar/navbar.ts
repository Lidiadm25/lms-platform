import { User } from './../../../auth/interfaces/user.interface';
import { UsersProjectService } from './../../../projects/services/UsersProjectService';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../../auth/services/authService';
import { ChatComponent } from "../my-drawer/chat-component/chat-component";
import { UiService } from '../my-drawer/uiService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ChatComponent],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  authService = inject(AuthService) 
  usersProjectService = inject(UsersProjectService)
  uiService = inject(UiService)
  home:Signal<string> = computed(() => this.establishRoutes());
  router = inject(Router)
  
  establishRoutes(){
    if(this.authService.isAdmin()){
     return 'admin'
    }
    return 'home'
  }

   logout(){
    this.authService.logout()
  }

  beTeacher(){
    this.authService.changeStatus().subscribe({
      next:(data) => this.usersProjectService.finishAllCourses().subscribe((data)=> console.log(data)),
      // error:(error)=>this.hasError.set(true)
    })
    this.router.navigateByUrl('admin')
  }
 }
