import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Lesson } from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-lesson-manager-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lesson-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonManagerPage { 

 constructor(private location:Location){
  effect(()=> {
    const lesson =  this.lessonResource.value();
    if(lesson){
      this.lessonForm.patchValue(lesson)
    }
  })

  }

  lessonService = inject(LessonService);
  activatedRoute = inject(ActivatedRoute)
  file: File| undefined = undefined;
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];

  fileUrl = signal<string>('');

  lessonResource = rxResource({
    params: () => ({ id: this.lessonId }),
    stream: ({ params }) => this.lessonService.getById(params.id),
  })

  fb = inject(FormBuilder)

  lessonForm = this.fb.group({
    title: ['', []],
    description: ['', []],
    maxSize: ['']
  })

   onFilesChange(event: any) {
  
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file = fileList[0];
      this.fileUrl.set(URL.createObjectURL(this.file));
    }
  }


  async OnSubmit(){
    if(this.verifySize(this.file,this.lessonForm.value.maxSize)){
    
        const lessonLike: Partial<Lesson> = {...(this.lessonForm.value as any)}
    await firstValueFrom(this.lessonService.updateLesson(this.lessonId, lessonLike, this.file))
    }
  }

  verifySize(file:File|undefined, size:string|null|undefined): boolean{
    if(file == undefined){
      
      return true
    }

    if( size== null || (size != null && file.size > +size )) {
      console.log("error, file size is over max size")
      return false;
    } else {
     return true;
    }
  }
  deleteLesson(){
    this.lessonService.delete(this.lessonId).subscribe(() => console.log("Lesson deleted"));
    this.location.back();
  }
}
