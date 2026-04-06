import { Unit } from './../../../projects/interfaces/project.interface';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UnitService } from '../../../projects/services/UnitService';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-units-manager-page',
  imports: [ReactiveFormsModule],
  templateUrl: './units-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsManagerPage {
   fb = inject(FormBuilder)
   activatedRoute = inject(ActivatedRoute);
  unitForm = this.fb.group({
    title: ['', []],
    description: ['', []],
  })

  edit = signal(true);
  unitService = inject(UnitService);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  unitId: string = this.activatedRoute.snapshot.params['idUnit'];

  constructor(){
    
    if(this.unitId != "create"){
      this.edit.set(false);
     this.unitService.getById(this.unitId).subscribe((result) => {
      console.log(result);
      this.unitForm.patchValue(result)
     });
  } 
  }

  async OnSubmit(){
    if(this.edit() == false){

    } else {
      const unit :Unit = {
        ...this.unitForm.value as any,
        project: this.projectId
      } 
      console.log(unit)
      firstValueFrom(await this.unitService.createUnit(unit))
    }
  }
 }
