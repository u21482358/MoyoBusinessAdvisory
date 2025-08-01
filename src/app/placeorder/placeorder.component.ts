import { Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { globalModules } from '../../globalModules';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
//import { NgModel } from '@angular/forms';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent],
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.scss'
})
export class PlaceorderComponent {
name:any
animal:any

 readonly dialogRef = inject(MatDialogRef<PlaceorderComponent>);
  readonly data = inject<Product>(MAT_DIALOG_DATA);
  product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
}
}
