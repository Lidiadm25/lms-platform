import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

import { ImageInput } from '../../components/image-input/image-input';
import { SearchTags } from "../../components/search-tags/search-tags";
import { FullProjectResponse } from '../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-project-manager-page',
  imports: [ReactiveFormsModule, ImageInput, SearchTags],
  templateUrl: './project-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagerPage {
  // Services
  projectService = inject(ProjectService);
  activatedRoute = inject(ActivatedRoute);
  // Form
  fb = inject(FormBuilder);

  // Variables
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  file: File| undefined = undefined;

  projectResource = rxResource({
    params: () => ({ id: this.projectId }),
    stream: ({ params }) => this.projectService.getById(params.id),
  });

  project:FullProjectResponse | undefined;

  imageUrl = model<string>('');

  constructor() {
    
    effect(() => {
      this.project=this.projectResource.value();
      
      if (this.project?.image) {
        console.log("aqui3")
        this.imageUrl.set(`http://localhost:3000/api/files/project/${this.project!.image}`);
        this.projectForm.patchValue(this.project);
        console.log("en project manager" + this.imageUrl())
      } else {
        console.log("aqui2")
        this.imageUrl.set('https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg')
      }
    });
  }

  wasSaved = signal(false);

  projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  async onSubmit() {
    const projectLike: Partial<FullProjectResponse> = {
      ...(this.projectForm.value as any),
    };

    await firstValueFrom(this.projectService.updateProject(this.projectId, projectLike, this.file ));
  }

 
  // TODO transaction that also collects the manage students changes of project
  // future search bar
  search = signal('');
  onSearch() {}
}
