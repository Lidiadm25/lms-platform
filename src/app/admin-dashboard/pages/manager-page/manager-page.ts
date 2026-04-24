import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager-page',
  imports: [RouterLink, RouterOutlet],
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
