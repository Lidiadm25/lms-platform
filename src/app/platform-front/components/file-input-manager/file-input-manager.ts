import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-file-input-manager',
  imports: [],
  templateUrl: './file-input-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputManager {
  file = model<File | undefined>(undefined);
  fileUrl = model<string>(
    'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg',
  );
  fileSize = input.required<number>();
  size = signal<string>('2 GB');
  ngOnInit() {
    if (this.fileSize() && this.fileSize() != 0) {
      let mb = Math.round(this.fileSize() / 1048576);
      this.size.set(mb.toString());
    }
  }

  // TODO multiple files
  onFilesChange(event: any) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file.set(fileList[0]);
      this.fileUrl.set(URL.createObjectURL(this.file() as File));
    }
  }
}
