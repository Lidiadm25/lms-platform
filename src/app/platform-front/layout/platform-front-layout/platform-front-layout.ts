import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MyDrawer } from '../../../shared/components/my-drawer/my-drawer';

@Component({
  selector: 'app-platform-front-layout',
  imports: [MyDrawer],
  templateUrl: './platform-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFrontLayout { }
