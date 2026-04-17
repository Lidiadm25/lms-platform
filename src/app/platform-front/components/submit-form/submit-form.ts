import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../projects/services/TaskService';
import { FileInputManager } from "../file-input-manager/file-input-manager";

@Component({
  selector: 'app-submit-form',
  imports: [FileInputManager, ReactiveFormsModule],
  templateUrl: './submit-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitForm {
   submissionId = input.required<string>();
   fileSize = input.required<number>();
   submitService = inject(TaskService)
   file! : File;
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
   imageUrl = signal<string>('');
   
  onSubmit(){
    console.log(this.imageUrl())
  
    
    this.submitService.updateSubmission(this.submissionId(), this.file) .subscribe((result) => (result.valueOf() ? this.success() : this.error()));
  }
  success() {
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  error() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);
  }
 
 }

