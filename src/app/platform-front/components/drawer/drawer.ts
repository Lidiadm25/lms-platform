import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-drawer',
  imports: [Navbar],
  templateUrl: './drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { }
