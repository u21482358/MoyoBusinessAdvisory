import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
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

//quantity:any

productorder:any = {}
 readonly dialogRef = inject(MatDialogRef<PlaceorderComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  subTotal:any = null
  product:any
  selectedVendorProduct:any
  vendorproducts:any
  vendorproduct:any
placeOrderForm: FormGroup = new FormGroup({

  //vendor: new FormControl('',Validators.required),
    quantity: new FormControl(this.productorder.numberOfItems,[Validators.required, Validators.pattern("^[0-9]*$"),this.quantityValidator]),
    
    //
})
constructor() { }

  
  

  onNoClick(): void {
    alert(this.productorder.numberOfItems)
    this.dialogRef.close();
}
// https://www.infragistics.com/blogs/custom-validators-angular-reactive-forms/
quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
 
    if ( control.value <= 0) {
        return { 'quantity': true }; // this means failed
    }
    return null;
}

ngAfterViewInit() {
      this.placeOrderForm.get('quantity')?.valueChanges.subscribe(value => {
       
        
this.subTotal = null
console.log(value)
console.log(this.vendorproducts)
// https://stackoverflow.com/questions/51747397/how-to-break-foreach-loop-in-typescript/51747545
  for (let element of this.vendorproducts) {
   if (element.quantityOnHand >= value && value>=0 && value){
    console.log(element)
    this.selectedVendorProduct = element;
    this.subTotal = value * element.price;
    console.log(this.subTotal)
    console.log(this.selectedVendorProduct)
    break;
   }
  
   
   
  
    }
      });
  }

  
  //this.isDisabled = false;


  
 

ngOnInit(){
  this.vendorproducts = this.data.vendorproducts
  this.product = this.data.product;
}

Submit(){
 this.productorder.numberOfItems = this.placeOrderForm.get('quantity')?.value;
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
