import { ChangeDetectionStrategy, Component, computed, effect, inject, resource, Signal, signal } from '@angular/core';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullProjectRespose, Project } from '../../../projects/interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-manager-page',
  imports: [  ReactiveFormsModule,],
  templateUrl: './project-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagerPage { 
  // recibe id por param
  projectService = inject(ProjectService)
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder)
  projectId = this.activatedRoute.snapshot.params['idProject'];
  
  projectResource = rxResource({
    params: ()=> ({ id: this.projectId}),
    stream : ({params}) => ( this.projectService.getById(params.id))
  })
 

  constructor(){
    effect(()=>{
      const project = this.projectResource.value();
      if(project){
        this.projectForm.patchValue(project as any);
        
      }
    })
  }

  wasSaved = signal(false);

  projectForm = this.fb.group({
    title: [this.projectResource.value()?.title, Validators.required],
    description: ['', Validators.required],

    
  })

  onSubmit(){}
  onFilesChange(event : Event){}
}
