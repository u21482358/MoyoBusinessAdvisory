import { Component, inject } from '@angular/core';
import { globalModules } from '../../globalModules';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-orderconfirmation',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,MatButtonModule],
  templateUrl: './orderconfirmation.component.html',
  styleUrl: './orderconfirmation.component.scss'
})
export class OrderconfirmationComponent {
readonly dialogRef = inject(MatDialogRef<OrderconfirmationComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  word:any = this.data

Submit(){
  this.dialogRef.close(true);
}
}
