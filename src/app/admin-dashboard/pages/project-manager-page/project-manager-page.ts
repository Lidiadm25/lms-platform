import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  resource,
  Signal,
  signal,
} from '@angular/core';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullProjectRespose, Project } from '../../../projects/interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormErrorLabel } from '../../../shared/components/form-error-label/form-error-label';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-project-manager-page',
  imports: [ReactiveFormsModule, FormErrorLabel, RouterLink],
  templateUrl: './project-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagerPage {
  // recibe id por param
  projectService = inject(ProjectService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  image = signal<string>(
    'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
  );

  file: File | undefined = undefined;

  projectResource = rxResource({
    params: () => ({ id: this.projectId }),
    stream: ({ params }) => this.projectService.getById(params.id),
  });

  constructor() {
    effect(() => {
      const project = this.projectResource.value();
      if (project) {
        this.projectForm.patchValue(project as any);
      }
    });
  }

  wasSaved = signal(false);

  projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [
      'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
    ],
  });

  async onSubmit() {
    const projectLike: Partial<FullProjectRespose> = {
      ...(this.projectForm.value as any),
    };

    await firstValueFrom(this.projectService.updateProject(this.projectId, projectLike, this.file));
  }

  /**
   * 2 Functionalities
   * 1.- Takes the name of the input file
   * 2.- Creates a reader that converts the file to base64 so its possible to do a preview
   * @param event
   */

  onFilesChange(event: any) {
    const input = event.target as HTMLInputElement;
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file = fileList[0];
      this.image.set(URL.createObjectURL(this.file));
    }
  }
  search = signal('');
  onSearch() {}
}
