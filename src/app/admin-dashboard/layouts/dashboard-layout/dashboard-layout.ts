import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/authService';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { Drawer } from "../../../shared/components/drawer/drawer";


@Component({
  selector: 'app-dashboard-layout',
  imports: [Navbar, Drawer],
  templateUrl: './dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout { 
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  
}
