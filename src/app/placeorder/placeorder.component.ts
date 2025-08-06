import { Component, inject, OnInit } from '@angular/core';
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
import { OrderLine } from '../Models/OrderLine';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-placeorder',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule], // why only forms module here and not in globalModules?
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.scss'
})
export class PlaceorderComponent implements OnInit {
name:any
animal:any
price:any
//quantity:any
isDisabled = false;
productorder:any = {}

constructor() { }
 readonly dialogRef = inject(MatDialogRef<PlaceorderComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  subTotal:any = null
  product:any
  selectedVendorProduct:any
  vendorproducts:any
  vendorproduct:any
  
  orderline:OrderLine = new OrderLine() // should it be readonly?
  //product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
}
updatesubTotal(value:any){
this.selectedVendorProduct = false
this.subTotal = null
// https://stackoverflow.com/questions/51747397/how-to-break-foreach-loop-in-typescript/51747545
  for (let element of this.vendorproducts) {
    if(value > 0){
   if (element.quantityOnHand >= value){
    console.log(element)
    this.selectedVendorProduct = element;
    this.subTotal = value * element.price;
    console.log(this.selectedVendorProduct)
    break;
   } 
  }else{
    
    this.selectedVendorProduct = false
    this.subTotal = null;
    break;
  }
}
  
  //this.isDisabled = false;
}

  
 

ngOnInit(){
  //this.orderline.
  this.productorder.numberOfItems = null
  //this.productorder.quantity = null
  console.log(this.data)
  this.product=this.data.product
  this.vendorproducts = this.data.vendorproducts
  this.orderline.quantity = 1
  this.orderline.order.client = {id: 1, name: 'Michael Gait-Smith'}; // Example client, replace with actual client data
this.orderline.product = this.data;
}

Submit(){

  this.selectedVendorProduct.product = this.product
  delete this.selectedVendorProduct.vendor.products // could delete by casting to object without that variable?
  //this.selectedVendorProduct.vendo = this.selectedVendor;
  console.log(this.selectedVendorProduct)
  delete this.selectedVendorProduct.orders
  this.productorder.VendorProduct = this.selectedVendorProduct;
  console.log(this.productorder)
 this.dialogRef.close(this.productorder);
}
}
