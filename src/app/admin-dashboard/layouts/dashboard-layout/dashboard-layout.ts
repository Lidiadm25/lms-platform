import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/authService';

import { MyDrawer } from "../../../shared/components/my-drawer/my-drawer";


@Component({
  selector: 'app-dashboard-layout',
  imports: [MyDrawer],
  templateUrl: './dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout { 
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  
}
