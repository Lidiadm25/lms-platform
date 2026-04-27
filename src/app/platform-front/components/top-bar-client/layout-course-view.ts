import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'layout-course-view',
  imports: [RouterOutlet],
  templateUrl: './layout-course-view.html',
 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCourseView { 

}
