import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbService } from './BreadcrumbService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {

  breadcrumbs: Array<{ label: string, url: string }> = [];

  breadcrumbsService = inject(BreadcrumbService)

  ngOnInit(){
    this.breadcrumbs = this.breadcrumbsService.breadcrumbs
  }

}
