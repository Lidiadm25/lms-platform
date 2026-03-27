import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchTags } from "../../components/search-tags/search-tags";
import { ImageInput } from "../../components/image-input/image-input";
import { ProjectService } from '../../../projects/services/ProjectService';
import { FullProjectResponse } from '../../../projects/interfaces/project.interface';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-project-creator',
  imports: [ReactiveFormsModule, SearchTags, ImageInput],
  templateUrl: '../project-manager-page/project-manager-page.html',
  //templateUrl:'./a.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreator {
  projectService = inject(ProjectService)
  fb = inject(FormBuilder)
    projectForm = this.fb.group({
    title: [''],
    description: [''],
    image: [''],
  });

  file!: File;

  imageUrl = model<string>('https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg');
  async onSubmit(){
    const projectLike: FullProjectResponse= {
          ...(this.projectForm.value as any),
        };
        projectLike.category ="907b3cf9-c320-48b1-9414-aee7729008ea";

  
     firstValueFrom( await this.projectService.createProject(projectLike, this.file ))
  
  }


 }
