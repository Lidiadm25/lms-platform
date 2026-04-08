import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../projects/services/ProjectService';
import { UserProjectCreate } from './../../../auth/interfaces/user.interface';

import { Location } from '@angular/common';
import { Project } from '../../../projects/interfaces/project.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { ImageInput } from '../../components/image-input/image-input';
import { SearchTags } from '../../components/search-tags/search-tags';
import { UnitsList } from '../../components/units-list/units-list';

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
  file!: File;
  edit = signal(false);
  projectLoaded = signal<Project | null>(null);

  project: Project | undefined;
  imageUrl = model<string>(
    'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
  );

  constructor(private location: Location) {
    this.project = undefined;
    if (this.projectId != 'create') {
      this.projectService
        .getById(this.projectId)
        .subscribe((result) => this.projectLoaded.set(result));
      effect(() => {
        var toggle = document.getElementById('toggle') as HTMLInputElement;
        if (this.projectLoaded() != null) {
          this.edit.set(true);
          this.projectForm.patchValue(this.projectLoaded() as Project);
          if (this.projectLoaded()?.isActive) toggle.checked = true;
          if (this.projectLoaded()!.image.length > 0) {
            this.imageUrl.set(
              `http://localhost:3000/api/files/project/${this.projectLoaded()!.image}`,
            );
          } else {
            this.imageUrl.set(
              'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
            );
          }
        }
      });
    }
  }

  wasSaved = signal(false);

  projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  async onSubmit() {
    const projectLike: Project = {
      ...(this.projectForm.value as any),
    };

    var toggle = document.getElementById('toggle') as HTMLInputElement;
    if (toggle.checked == true) {
      projectLike.isActive = true;
    } else projectLike.isActive = false;

    if (this.edit() == true) {
      await firstValueFrom(
        this.projectService.updateProject(this.projectId, projectLike, this.file),
      );
    } else {
      projectLike.category = '907b3cf9-c320-48b1-9414-aee7729008ea';
      await firstValueFrom(this.projectService.createProject(projectLike, this.file));
    }

    // TODO users inscription WHEN CREATE
    if (this.users.length > 0) {
      await this.userProjectService
        .addUsers(this.usersEmails)
        .subscribe(() => console.log('User added'));
    }
  }

  deleteProject() {
    this.projectService.delete(this.projectId).subscribe(() => console.log('Lesson deleted'));
    this.location.back();
  }

  users: Array<string> = [];
  usersEmails: UserProjectCreate[] = [];

  usersInscription(event: any) {
    this.users = event;
    for (let index = 0; index < this.users.length; index++) {
      this.usersEmails[index] = {
        projectId: this.projectId,
        userEmail: this.users[index],
      };
    }
  }
}
