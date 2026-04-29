import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-modal-delete-confirmation',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './modal-delete-confirmation.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteConfirmation {
 
  

  constructor(public matDialogRef: MatDialogRef<ModalDeleteConfirmation>, @Inject(MAT_DIALOG_DATA)  public data :any ){
    

  }

  deleteValue(){
   
    this.matDialogRef.close(this.data.name)
    
  } 
  closing(){
    this.matDialogRef.close('')
  }
 }
