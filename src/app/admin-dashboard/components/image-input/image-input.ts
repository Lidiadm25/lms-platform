import { FullProjectRespose } from './../../../projects/interfaces/project.interface';
import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageInput { 
  file: File| undefined = undefined;
  imageUrl = model<string>('')

   onFilesChange(event: any) {
    console.log("cambia")
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file = fileList[0];
      this.imageUrl.set(URL.createObjectURL(this.file));
    }
    console.log("cambia, " + this.imageUrl())
  }

}
