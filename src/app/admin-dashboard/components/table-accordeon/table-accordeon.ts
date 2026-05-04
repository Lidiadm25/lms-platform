import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectService } from './../../../projects/services/ProjectService';
import { LessonAccordeon } from "./lesson-accordeon/lesson-accordeon";


@Component({
  selector: 'app-table-accordeon',
  imports: [LessonAccordeon],
  templateUrl: './table-accordeon.html',


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
    this.router.navigateByUrl("/admin/manager/"+this.idProject()+"/unit/" + id) 
  }

 
 }
