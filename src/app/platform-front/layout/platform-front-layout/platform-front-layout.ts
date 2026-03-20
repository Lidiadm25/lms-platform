import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Drawer } from '../../../shared/components/drawer/drawer';
import { Navbar } from '../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-platform-front-layout',
  imports: [Drawer, Navbar],
  templateUrl: './platform-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFrontLayout { }
