import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
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
//import { FormsModule } from '@angular/forms';
//import { NgModel } from '@angular/forms';
//import { NgModel } from '@angular/forms';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule], // why only forms module here and not in globalModules?
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.scss'
})
export class PlaceorderComponent {
name:any
animal:any
price:any
quantity:any = 1
isDisabled = false;

 readonly dialogRef = inject(MatDialogRef<PlaceorderComponent>);
  readonly data = inject<Product>(MAT_DIALOG_DATA);
  subTotal:any = this.data.price
  product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);
ngoninit(){
  alert(this.data.name)
}
  onNoClick(): void {
    this.dialogRef.close();
}
updatesubTotal(value:any){
  //console.log(this.quantity)
  //alert(value)
  this.subTotal = value * this.data.price;
  if(!this.subTotal){
    //alert("Please enter a valid quantity");
    this.isDisabled = true;
  }else{
    this.isDisabled = false;
  }
}
}
