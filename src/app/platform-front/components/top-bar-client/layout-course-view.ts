import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'layout-course-view',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-course-view.html',
 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCourseView {
  
  activatedRoute = inject(ActivatedRoute)
idProject = this.activatedRoute.snapshot.params['idProject'];
}
