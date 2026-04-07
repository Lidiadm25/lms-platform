import { UserProjectCreate } from './../../../auth/interfaces/user.interface';
import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

import { ImageInput } from '../../components/image-input/image-input';
import { SearchTags } from '../../components/search-tags/search-tags';
import { UnitsList } from '../../components/units-list/units-list';
import { Project } from '../../../projects/interfaces/project.interface';
import { Location } from '@angular/common';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';

@Component({
  selector: 'app-project-manager-page',
  imports: [ReactiveFormsModule, ImageInput, SearchTags, UnitsList],
  templateUrl: './project-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagerPage {
  // Services
  projectService = inject(ProjectService);
  userProjectService = inject(UsersProjectService);
  activatedRoute = inject(ActivatedRoute);
  // Form
  fb = inject(FormBuilder);

  // Variables
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  file: File | undefined = undefined;

  projectResource = rxResource({
    params: () => ({ id: this.projectId }),
    stream: ({ params }) => this.projectService.getById(params.id),
  });

  project: Project | undefined;

  imageUrl = model<string>('');

  constructor(private location: Location) {
    effect(() => {
      this.project = this.projectResource.value();

      if (this.project) {
        this.projectForm.patchValue(this.project);
        if (this.project.image)
          this.imageUrl.set(`http://localhost:3000/api/files/project/${this.project!.image}`);
      } else {
        this.imageUrl.set(
          'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
        );
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
    const projectLike: Partial<Project> = {
      ...(this.projectForm.value as any),
    };

    await firstValueFrom(this.projectService.updateProject(this.projectId, projectLike, this.file));

    if (this.users.length > 0) {
      let user: UserProjectCreate = {
        projectId: this.projectId,
        userEmail: this.users[0],
      };
      await this.userProjectService.addUser(user).subscribe(() => console.log('User added'));
    }
  }

  deleteProject() {
    this.projectService.delete(this.projectId).subscribe(() => console.log('Lesson deleted'));
    this.location.back();
  }

  users: Array<string> = [];

  usersInscription(event: any) {
    this.users = event;
  }
}
