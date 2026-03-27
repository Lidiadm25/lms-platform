import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchTags } from "../../components/search-tags/search-tags";

@Component({
  selector: 'app-dashboard-page',
  imports: [SearchTags],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage { }
