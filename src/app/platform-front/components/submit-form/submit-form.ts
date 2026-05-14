import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../projects/services/TaskService';
import { FileInputManager } from "../file-input-manager/file-input-manager";
import { Task } from '../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-submit-form',
  imports: [FileInputManager, ReactiveFormsModule],
  templateUrl: './submit-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitForm {
   submissionId = input.required<string>();
   fileSize = signal<number>(0)
   id = signal<string>('')
   submitService = inject(TaskService)

   task = input.required<Task | null>();
     file = model<File[]>([]);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

   ngOnInit(){
  if(this.task != null){
      this.id.set(this!.task()!.id)
    this.fileSize.set(this!.task()!.fileSize)
  }
   }

  onSubmit(){
    
  
    
    this.submitService.updateSubmission(this.submissionId(), this.file(), this.id()).subscribe((x)=> {this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    
    }, 3000);})

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);
  }
 
 }

