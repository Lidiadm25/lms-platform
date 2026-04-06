import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UnitCard } from "./unit-card/unit-card";
import { Unit } from '../../../projects/interfaces/project.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-units-list',
  imports: [UnitCard, RouterLink],
  templateUrl: './units-list.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsList {
  units = input.required<Unit[]>();
  projectId = input.required<string>();
 }
