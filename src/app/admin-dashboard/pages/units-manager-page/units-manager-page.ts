import { NgClass } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../projects/services/ProjectService';
import { UnitService } from '../../../projects/services/UnitService';
import { Unit } from './../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-units-manager-page',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './units-manager-page.html',
})
export class UnitsManagerPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  unitService = inject(UnitService);
  projectService = inject(ProjectService)
  unitForm = this.fb.group({
    title: ['', []],
    description: ['', []],
  });



  projectId: string = this.route.parent?.snapshot.params['idProject'];
  unitId = signal<string | null>('create');
  edit = signal(false);
  unitLoaded = signal<Unit | null>(null);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('idUnit');
        if(id && id.toLowerCase()!== 'create'){
          this.unitId.set(id)
        } else {
          this.unitId.set(null);
        }

      });
      if (this.unitId() != 'create' && this.unitId()!= null) {
        this.edit.set(true);
      

        this.unitService.getById(this.unitId() as string).subscribe((result) => {
          
          this.unitLoaded.set(result);
          this.unitForm.patchValue(result);
        
        });
      } else {
        this.unitForm.reset();
      }
    });
  }

  async OnSubmit() {
    const unit: Unit = {
      ...(this.unitForm.value as any),
      id: this.unitId(),
      project: this.projectId,
    };
    if (this.edit() == true) {
      this.unitService.updateUnit(unit).subscribe((x)=> console.log(x));
    } else {
      const { id, ...rest } = unit;
     this.unitService.createUnit(rest as Unit).subscribe((x)=> {
      this.unitId.set(x.id)
    });
    }
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  verifyStatus() {
    if (!this.wasSaved() && this.unitId() == 'create') {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    } else {
      let route: string = '/admin/manager/' + this.projectId + '/' + this.unitId() + '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }

  deleteUnit() {
    this.unitService.delete(this.unitId() as string).subscribe(() => console.log('unit deleted'));
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
