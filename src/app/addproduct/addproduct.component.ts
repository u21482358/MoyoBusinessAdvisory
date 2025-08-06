import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/User';
import { MatSelectChange } from '@angular/material/select';
import { VendorProduct } from '../Models/VendorProduct';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {
name:any
animal:any
price:any
quantity:any = 1
isDisabled = false;
stockonHand:any
userSelected:any
vendorproduct = new VendorProduct()
product = new Product()
vendors:any
 //vendorproduct:any
selectedProduct = undefined
//vendor:User = new User();
selectedVendor:any
ExistingValue = false
NewValue = false
title:any = "Add Product"
// vendors = [
//   {name: 'HP', id: 1},
//    {name: 'Lennovo', id: 2},
//    {name: 'Dell', id: 3}
// ];
 readonly dialogRef = inject(MatDialogRef<AddproductComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  action = this.data.action
  existingProducts:any
   // should it be readonly?
 
  //subTotal:any = this.data.price
  //product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
 //this.product.product
  console.log(this.data)
  
  this.vendors = this.data.vendors
  if(this.data.action == 'assign'){
    this.title = "Assign Vendor"
    this.product = this.data.product
    console.log(this.product.name)
  }
  
  //this.vendors = this.data.vendors;
  //console.log(this.vendors[0].Id);
  //alert(this.data.name)
}

onSelectionChange(event:MatSelectChange){
  if(event.value == undefined){
   this.ExistingValue = false
  }else{
this.ExistingValue = true
  }
}




OnKeyup(value:any){
  console.log(value)
if(value){
  this.NewValue = true
}else{
  this.NewValue = false
}
}

Submit(){
  this.vendorproduct.product = this.product
  //this.vendorproduct.vendor = this.ve
  console.log(this.selectedVendor)
  console.log(this.product)
  console.log(this.vendorproduct)
  //alert("hi")
  //console.log(this.product)
  //alert(this.product.name)
  //alert(this.product.vendorId)
  //alert(this.product.price)
  //alert(this.product.stockonHand)
  //alert(this.product.price);
  this.dialogRef.close(this.vendorproduct);
}

  
updatesubTotal(value:any){
  //console.log(this.quantity)
  //alert(value)
  //this.subTotal = value * this.data.price;
 
}

}
