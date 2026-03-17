import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-drawer',
  imports: [Navbar, RouterLink, RouterOutlet],
  templateUrl: './drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { }
