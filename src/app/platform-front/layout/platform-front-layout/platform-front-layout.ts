import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Drawer } from '../../../shared/components/drawer/drawer';
import { Navbar } from '../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-platform-front-layout',
  imports: [Drawer],
  templateUrl: './platform-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFrontLayout { }
