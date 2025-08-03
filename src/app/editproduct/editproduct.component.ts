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
vendors = [
  {name: 'HP', id: 1},
    {name: 'Lennovo', id: 2},
      {name: 'Dell', id: 3}]


 readonly dialogRef = inject(MatDialogRef<EditproductComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  subTotal:any = this.data.price
  product:Product = this.data.product; // should it be readonly?
  userRole:any = this.data.userRole; // should it be readonly?
  command:any = this.data.command; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
  this.selectedVendorId = 1
  //this.selectedVendorId = this.data.product.vendor.id;
  this.quantity = this.data.product.quantity;
  this.name = this.data.product.name;
  this.price = this.data.product.price;
  //this.vendors = this.data.product.vendor.id;
  this.stockonHand = this.data.product.stockonHand;


  this.isDisabledobj = {name:true,quantity:true,vendor:true,price:true,stockonHand:true};
  switch(this.command){
    case "Captureredit":
      this.isDisabledobj.name = false; // Disable name field
      this.isDisabledobj.vendor = false; // Disable price field
      this.stockonHand = this.product.stockonHand;
      
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
  
updatesubTotal(value:any){
 
}

}

