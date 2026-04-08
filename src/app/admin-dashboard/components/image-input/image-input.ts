
import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageInput { 
  file = model<File|undefined>(undefined);
  imageUrl = model<string>('https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg')

   onFilesChange(event: any) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file.set(fileList[0]);
      this.imageUrl.set(URL.createObjectURL(this.file() as File));
    }
  }

}
