import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {
name:any
animal:any
price:any
quantity:any = 1
isDisabled = false;
stockonHand:any
vendors = [
  {name: 'HP', id: 1},
   {name: 'Lennovo', id: 2},
   {name: 'Dell', id: 3}
];
 readonly dialogRef = inject(MatDialogRef<AddproductComponent>);
  //readonly data = inject<Product>(MAT_DIALOG_DATA);
  //subTotal:any = this.data.price
  //product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}
ngoninit(){
  //alert(this.data.name)
}
  
updatesubTotal(value:any){
  //console.log(this.quantity)
  //alert(value)
  //this.subTotal = value * this.data.price;
 
}

}
