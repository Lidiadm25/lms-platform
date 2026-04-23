import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../projects/services/ProjectService';
import { UserProjectCreate } from './../../../auth/interfaces/user.interface';

import { Location } from '@angular/common';
import { Project } from '../../../projects/interfaces/project.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { ImageInput } from '../../components/image-input/image-input';
import { SearchTags } from '../../components/search-tags/search-tags';
import { UnitsList } from '../../components/units-list/units-list';
import { CategoryDropdown } from '../../components/category-dropdown/category-dropdown';

@Component({
  selector: 'app-project-manager-page',
  imports: [ReactiveFormsModule, ImageInput, SearchTags, UnitsList, RouterLink, CategoryDropdown],
  templateUrl: './project-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagerPage {
  // Services
  projectService = inject(ProjectService);
  userProjectService = inject(UsersProjectService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  // Form
  fb = inject(FormBuilder);

  // Variables
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  file!: File;
  edit = signal(false);
  projectLoaded = signal<Project | null>(null);

  imageUrl = model<string>(
    'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
  );

  constructor(private location: Location) {
    if (this.projectId != 'create') {
      this.projectService
        .getById(this.projectId)
        .subscribe((result) => this.projectLoaded.set(result));

      effect(() => {
        var toggle = document.getElementById('toggle') as HTMLInputElement;
        if (this.projectLoaded() != null) {
          console.log(this.projectLoaded());
          this.edit.set(true);

          this.projectForm.patchValue({
            title: this.projectLoaded()?.title,
            description: this.projectLoaded()?.description,
            image: this.projectLoaded()?.image,
            category: this.projectLoaded()?.category.id,
          });
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
    category: [''],
  });

  getSelectedControlCategory(): FormControl {
    return this.projectForm.get('category') as FormControl;
  }

  async onSubmit() {
    if (this.hasError() == true) return;

    const projectLike: Project = {
      ...(this.projectForm.value as any),
    };

    var toggle = document.getElementById('toggle') as HTMLInputElement;
    if (toggle.checked == true) {
      projectLike.isActive = true;
    } else projectLike.isActive = false;

    if (this.edit() == true) {
      this.projectLoaded.set(
        await firstValueFrom(
          this.projectService.updateProject(this.projectId, projectLike, this.file),
        ),
      );
    } else {
      this.projectLoaded.set(
        await firstValueFrom(this.projectService.createProject(projectLike, this.file)),
      );
    }
    this.projectId = this.projectLoaded()!.id;


    if (this.users.length > 0) {
      await this.userProjectService
        .addUsers(this.usersEmails)
        .subscribe(() => console.log('User added'));
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  hasError = signal<boolean>(false);

  verifyStatus() {
    if (!this.wasSaved() && this.projectId == 'create') {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    } else {
      let route: string = '/admin/units-manager/' + this.projectId + '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }

  deleteProject() {
    this.hasError.set(true);
    this.projectService.delete(this.projectId).subscribe(() => this.projectLoaded.set(null));
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
