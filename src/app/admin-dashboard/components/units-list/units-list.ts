import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UnitCard } from "./unit-card/unit-card";
import { Unit } from '../../../projects/interfaces/project.interface';


@Component({
  selector: 'app-units-list',
  imports: [UnitCard],
  templateUrl: './units-list.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsList {
  units = input.required<Unit[]>();
 }
