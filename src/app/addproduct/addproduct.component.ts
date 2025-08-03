import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/User';


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
userSelected:any
product = new Product()
//vendor:User = new User();
selectedVendor:any
// vendors = [
//   {name: 'HP', id: 1},
//    {name: 'Lennovo', id: 2},
//    {name: 'Dell', id: 3}
// ];
 readonly dialogRef = inject(MatDialogRef<AddproductComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  vendors = this.data; // should it be readonly?
  vendor:any
  //subTotal:any = this.data.price
  //product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
  console.log(this.vendors[0].Id);
  //alert(this.data.name)
}

Submit(){
  console.log(this.selectedVendor)
  console.log(this.product)
  console.log(this.product.vendor)
  //alert("hi")
  //console.log(this.product)
  //alert(this.product.name)
  //alert(this.product.vendorId)
  //alert(this.product.price)
  //alert(this.product.stockonHand)
  //alert(this.product.price);
  this.dialogRef.close(this.product);
}

  
updatesubTotal(value:any){
  //console.log(this.quantity)
  //alert(value)
  //this.subTotal = value * this.data.price;
 
}

}
