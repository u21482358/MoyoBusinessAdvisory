import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit {
name:any
animal:any
price:any
quantity:any = 1
selectedVendorId:any
//product:any
stockonHand:any
isDisabledobj:any
vendors:any = []
// vendors = [
//   {name: 'HP', id: 1},
//     {name: 'Lennovo', id: 2},
//       {name: 'Dell', id: 3}]


 readonly dialogRef = inject(MatDialogRef<EditproductComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  subTotal:any = this.data.price
  product:Product = new Product() // should it be readonly?
  userRole:any = this.data.userRole; // should it be readonly?
  command:any = this.data.command; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
  console.log(this.data.vendors)
  console.log(this.data.product.vendor)
  this.selectedVendorId = 1
  this.product = JSON.parse(JSON.stringify(this.data.product)); // https://stackoverflow.com/questions/51448458/typescript-changes-on-variable-are-being-reflected-on-another-variable
  //this.product.vendor = this.data.product.vendor; // Assigning the vendor object directly
  //this.selectedVendorId = this.data.product.vendor.id;
  this.quantity = this.data.product.quantity;
  this.name = this.data.product.name;
  this.price = this.data.product.price;
  //this.vendors = this.data.product.vendor.id;
  this.stockonHand = this.data.product.stockonHand;
this.vendors = this.data.vendors;

  this.isDisabledobj = {name:true,quantity:true,vendor:true,price:true,stockonHand:true};
  switch(this.command){
    case "Captureredit":
      this.isDisabledobj.name = false; // Disable name field
      this.isDisabledobj.vendor = false; // Disable price field
     // this.stockonHand = this.product.stockonHand;
      
      break;
    case "price":
      // Initialize for adding a new product
      this.name = '';
      this.isDisabledobj.price = false; // Disable price field
      this.price = 0;
      this.stockonHand = 0;
      this.animal = '';
      break;
       case "stockonHand":
      // Initialize for adding a new product
      this.name = '';
      this.isDisabledobj.stockonHand = false; // Disable stockonHand field
      this.price = 0;
      this.stockonHand = 0;
      this.animal = '';
      break;
    default:
      console.error("Unknown command");
  }
  console.log(this.selectedVendorId)
}
  
Submit(){
  // better to put the product so you dont have to run this.
  //this.product.vendor = this.vendors.find((vendor:any) => vendor.id === this.product.vendor.id);
  console.log(this.product)
  this.dialogRef.close(this.product);
}

}

