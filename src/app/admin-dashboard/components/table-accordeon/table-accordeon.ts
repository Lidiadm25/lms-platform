import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectService } from './../../../projects/services/ProjectService';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-table-accordeon',
  imports: [],
  templateUrl: './table-accordeon.html',
  styleUrl: './table-accordeon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAccordeon {
  idProject = input<string>('')
  projectService = inject(ProjectService)
  projectLoaded = signal<Project|null>(null);
  router = inject(Router);
  ngOnInit(
  ){
    console.log(this.idProject())
    if(this.idProject() && this.idProject() != 'create'){

      this.projectService.getById(this.idProject()).subscribe((result)=> this.projectLoaded.set(result))

    }
    console.log(this.projectLoaded())
  }

  navigateUnits(id:string){
    this.router.navigateByUrl("/admin/manager/"+this.idProject()+"/" + id) 
  }

  navigateLesson(unitId:string,id:string){
    this.router.navigateByUrl("/admin/manager/"+this.idProject()+"/"+unitId+"/" + id) 
  }
 }
