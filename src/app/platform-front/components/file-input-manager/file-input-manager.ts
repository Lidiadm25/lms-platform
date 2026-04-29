import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteConfirmation } from '../modal-delete-confirmation/modal-delete-confirmation';
interface fileData {
  name: string;
  type: string;
}
@Component({
  selector: 'app-file-input-manager',
  imports: [],
  templateUrl: './file-input-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputManager {
  file = model<File | undefined>(undefined);
  fileUrl = model<string[]>();
  fileSize = input.required<number>();
  dialog = inject(MatDialog);
  fileList: FileList | undefined = undefined;
  size = signal<string>('2 GB');
  tempFilesNames = signal<fileData[]>([]);
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
      var newNames = Array.from(fileList ?? []).map((file) => ({
        name: file.name,
        type: file.name.slice(file.name.length - 3),
      }));

      this.fileList = fileList;
      this.file.set(fileList[0]);
      let filesArray = Array.from(fileList ?? []).map((file) => URL.createObjectURL(file));

      this.fileUrl.update((array) => array!.concat(filesArray));

      for (let index = 0; index < newNames.length; index++) {
        const element = newNames[index];
        if (element.type == 'pdf') {
          newNames[index].type = './assets/pdf.svg';
        } else if (element.type == 'jpg' || element.type == 'png' || element.type == 'jpeg') {
          newNames[index].type = './assets/image.svg';
        } else {
          newNames[index].type = './assets/zip.svg';
        }
      }

      this.tempFilesNames.update((names) => names.concat(newNames));
      console.log(this.tempFilesNames());
    } else {
      this.tempFilesNames.set([]);
    }
  }

  removeFiles() {}

  openModal(name: string) {
    let dialogRef = this.dialog.open(ModalDeleteConfirmation, {
      data: { name: name },
    });

    //dialogRef.afterClosed().
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
         const filtered =this.tempFilesNames().filter(
          (file) =>
            typeof file.name === 'string' &&
            typeof result === 'string' &&
           ! file.name.toLowerCase().includes(result.toLowerCase()),
        );
        this.tempFilesNames.set(filtered)
        console.log(this.tempFilesNames());
      }
    });
  }
}
