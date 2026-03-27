
import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageInput { 
  file = model<File|undefined>(undefined);
  imageUrl = model<string>('')

   onFilesChange(event: any) {
    console.log("cambia")
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file.set(fileList[0]);
      this.imageUrl.set(URL.createObjectURL(this.file() as File));
    }
    console.log("cambia, " + this.imageUrl())
  }

}
