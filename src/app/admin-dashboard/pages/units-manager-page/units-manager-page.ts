import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UnitService } from '../../../projects/services/UnitService';
import { TableAccordeon } from '../../components/table-accordeon/table-accordeon';
import { Unit } from './../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-units-manager-page',
  imports: [ReactiveFormsModule, TableAccordeon],
  templateUrl: './units-manager-page.html',
})
export class UnitsManagerPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  unitForm = this.fb.group({
    title: ['', []],
    description: ['', []],
  });

  edit = signal(false);
  unitService = inject(UnitService);
  projectId: string = this.activatedRoute.parent?.snapshot.params['idProject'];
  unitId = signal<string>('create')
  router = inject(Router);
  route = inject(ActivatedRoute);
  unitLoaded = signal<Unit | null>(null);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor() {
    
    effect(()=>{
     this.route.paramMap.subscribe(params => {
      const id = params.get('idUnit') ?? 'create';
      this.unitId.set(id); 
    })
      if (this.unitId() != 'create') {
       
      this.edit.set(true);
      this.unitService.getById(this.unitId()
      ).subscribe((result) => {
        this.unitLoaded.set(result);
        this.unitForm.patchValue(result);
        console.log(result)
      });
    } else {
      this.unitForm.reset();
    }
    })
  }

  async OnSubmit() {
    const unit: Unit = {
      ...(this.unitForm.value as any),
      id: this.unitId,
      project: this.projectId,
    };
    if (this.edit() == true) {
      firstValueFrom(await this.unitService.updateUnit(unit));
    } else {
      const { id, ...rest } = unit;
      firstValueFrom(await this.unitService.createUnit(rest as Unit));
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
      let route: string = '/admin/manager/'+this.projectId +'/' +this.unitId() + '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }

  deleteUnit() {
    this.unitService.delete(this.unitId()).subscribe(() => console.log('unit deleted'));

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
