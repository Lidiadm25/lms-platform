import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectService } from './../../../projects/services/ProjectService';
import { LessonAccordeon } from './lesson-accordeon/lesson-accordeon';

@Component({
  selector: 'app-table-accordeon',
  imports: [LessonAccordeon],
  templateUrl: './table-accordeon.html',
})
export class TableAccordeon {
  projectData = input<Project | null>(null);



  projectLoaded = signal<Project | null>(null);
  router = inject(Router);



  constructor() {
    effect(() => {
      if (this.projectData()) {
        this.projectLoaded.set(this.projectData());
      }
    })
  }

  navigateUnits(id: string) {
    this.router.navigateByUrl('/admin/manager/' + this.projectLoaded()?.id + '/unit/' + id);
  }
}
