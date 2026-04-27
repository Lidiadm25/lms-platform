import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { TableAccordeon } from "../../components/table-accordeon/table-accordeon";

@Component({
  selector: 'app-manager-page',
  imports: [RouterLink, RouterOutlet, TableAccordeon],
  templateUrl: './manager-page.html',
  styleUrl: './manager-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerPage { 

activatedRoute = inject(ActivatedRoute);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
ngOnInit(){
  console.log(this.projectId)
}

}
