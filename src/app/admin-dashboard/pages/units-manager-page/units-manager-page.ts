import { Unit } from './../../../projects/interfaces/project.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UnitService } from '../../../projects/services/UnitService';
import { firstValueFrom } from 'rxjs';
import { LessonCard } from '../../components/units-list/unit-card/lesson-card/lesson-card';

@Component({
  selector: 'app-units-manager-page',
  imports: [ReactiveFormsModule, LessonCard],
  templateUrl: './units-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  unitId: string = this.activatedRoute.snapshot.params['idUnit'];
  router = inject(Router);
  route = inject(ActivatedRoute);
  unitLoaded = signal<Unit | null>(null);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor() {
    if (this.unitId != 'create') {
      this.edit.set(true);
      this.unitService.getById(this.unitId).subscribe((result) => {
        this.unitLoaded.set(result);
        this.unitForm.patchValue(result);
      });
    }
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
    if (!this.wasSaved() && this.unitId == 'create') {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    } else {
      let route: string = '/admin/lesson-manager/' + this.unitId + '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }

  deleteUnit() {
    this.unitService.delete(this.unitId).subscribe(() => console.log('unit deleted'));

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
