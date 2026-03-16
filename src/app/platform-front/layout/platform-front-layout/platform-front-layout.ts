import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../components/drawer/navbar/navbar";
import { Drawer } from "../../components/drawer/drawer";

@Component({
  selector: 'app-platform-front-layout',
  imports: [Navbar, Drawer],
  templateUrl: './platform-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFrontLayout { }
