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
  file = model<File[]>([]);

  fileSize = input.required<number>();
  dialog = inject(MatDialog);

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
  const input = event.target as HTMLInputElement;
  const fileList = input.files;

  if (fileList && fileList.length > 0) {
    const currentFiles = this.file();
    const newFilesArray = Array.from(fileList);

    const uniqueNewFiles = newFilesArray.filter(
      (newFile) => !currentFiles.some(
        (existing) => existing.name === newFile.name && existing.size === newFile.size
      )
    );

    if (uniqueNewFiles.length > 0) {
      const newVisualFiles = uniqueNewFiles.map((file) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        let iconPath = './assets/zip.svg';

        if (extension === 'pdf') {
          iconPath = './assets/pdf.svg';
        } else if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
          iconPath = './assets/image.svg';
        }

        return {
          name: file.name,
          type: iconPath
        };
      });

      this.file.update((current) => [...current, ...uniqueNewFiles]);
      this.tempFilesNames.update((names) => [...names, ...newVisualFiles]);
    }
  } else if (this.file().length === 0) {
    this.file.set([]);
    this.tempFilesNames.set([]);
  }

  input.value = '';
}

  openModal(name: string) {
    let dialogRef = this.dialog.open(ModalDeleteConfirmation, {
      data: { name: name },
    });

    //dialogRef.afterClosed().
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const filtered = this.tempFilesNames().filter(
          (file) => file.name !== result
        );
        const filteredReal = this.file()!.filter((file) =>  file.name !== result);
        this.tempFilesNames.set(filtered);
        this.file.set(filteredReal);
        console.log(this.file());
      }
    });
  }
}
