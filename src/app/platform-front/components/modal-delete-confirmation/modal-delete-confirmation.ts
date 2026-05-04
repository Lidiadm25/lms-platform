import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-confirmation',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './modal-delete-confirmation.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteConfirmation {
  constructor(
    public matDialogRef: MatDialogRef<ModalDeleteConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  deleteValue() {
    this.matDialogRef.close(this.data.name);
  }
  closing() {
    this.matDialogRef.close('');
  }
}
