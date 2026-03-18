import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Drawer } from "../../components/drawer/drawer";

@Component({
  selector: 'app-platform-front-layout',
  imports: [Drawer, Navbar],
  templateUrl: './platform-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFrontLayout { }
