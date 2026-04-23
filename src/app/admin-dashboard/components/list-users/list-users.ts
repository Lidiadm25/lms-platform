import { ChangeDetectionStrategy, Component, inject, input, signal, Output, output } from '@angular/core';
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';

@Component({
  selector: 'app-list-users',
  imports: [],
  templateUrl: './list-users.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsers { 
  projectId = input.required<string>();
  paginationService = inject(PaginationService)
  usersProjectService = inject(UsersProjectService)
  page = this.paginationService.currentPage() - 1;
  usersList = signal<UsersProjectResponse | null>(null);
  userChosen = output<string>()
  
  ngOnInit(){
    this.usersProjectService.getUsers(this.projectId(),{offset: this.page * 9}).subscribe((result) => {this.usersList.set(result)
      console.log(result)
    } )
  }

  emitUser(id:string){
   
    this.userChosen.emit(id);
  }

}
