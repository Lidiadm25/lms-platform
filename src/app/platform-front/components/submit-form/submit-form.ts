import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FileInputManager } from "../file-input-manager/file-input-manager";
import { TaskService } from '../../../projects/services/TaskService';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

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

   imageUrl = signal<string>('');
   
  onSubmit(){
    console.log(this.imageUrl())
  
    
    this.submitService.updateSubmission(this.submissionId(), this.file).subscribe((result)=> console.log(result))
  }

 
 }

