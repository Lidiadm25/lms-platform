import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseStateService {
 
  private reloadTrigger = signal(0);
  public reload = this.reloadTrigger.asReadonly();

 
  notifyUpdate() {
    this.reloadTrigger.update(v => v + 1);
  }

}
