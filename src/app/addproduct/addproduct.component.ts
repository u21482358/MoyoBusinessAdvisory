import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { AbstractControl, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { MatSelectChange } from '@angular/material/select';
import { VendorProduct } from '../Models/VendorProduct';
import { DecimalPipe } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule,CurrencyMaskModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {




vendorproduct = new VendorProduct()
product = new Product()
vendors:any
title:any = "Add Product"
readonly dialogRef = inject(MatDialogRef<AddproductComponent>);
readonly data = inject<any>(MAT_DIALOG_DATA);
action = this.data.action
existingProducts:any


 amountOptions = {
        align: 'right',
        allowNegative: false,
        allowZero: true,
        decimal: '.',
        precision: 2,
        prefix: 'R',
        suffix: '',
        //thousands: '.'
    };
constructor(private decimalPipe: DecimalPipe){

};

//https://stackoverflow.com/questions/63953338/angular-forms-integer-validator/63953423
addProductForm: FormGroup = new FormGroup({
  name: new FormControl('',Validators.required),
      vendor: new FormControl('',Validators.required),
   price: new FormControl('',[Validators.required]),
      quantityOnHand: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),this.quantityValidator]),
  });

   // should it be readonly?
 
  //subTotal:any = this.data.price
  //product:Product = this.data; // should it be readonly?
 // readonly animal = model(this.data.animal);
 onNoClick(): void {
    this.dialogRef.close();
}

quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
 console.log("quantity validate")
    if ( control.value <= 0) {
        return { 'quantity': true }; // this means failed
    }
    return null;
}
ngOnInit(){
 //this.product.product
  console.log(this.data)
  
  this.vendors = this.data.vendors
  if(this.data.action == 'assign'){
    this.addProductForm.get("name")?.setValue(this.data.product.name);
    this.addProductForm.get("name")?.disable()
    this.title = "Assign Vendor"
    this.product = this.data.product
    console.log(this.product.name)
  }
  
  //this.vendors = this.data.vendors;
  //console.log(this.vendors[0].Id);
  //alert(this.data.name)
}


Submit(){
  
  //this.vendorproduct.vendor = this.ve
  
  console.log(this.product)
  console.log(this.vendorproduct)

  this.vendorproduct = this.addProductForm.value
  this.product.name = this.addProductForm.get('name')?.value
  this.vendorproduct.product = this.product
  
 console.log(this.vendorproduct)
this.dialogRef.close(this.vendorproduct);
}

ngAfterViewInit() {

//   this.addProductForm.get('price')?.valueChanges.subscribe(value => {
// console.log(value)
          
//          value = this.decimalPipe.transform(value, '1.2-2');
//          this.addProductForm.get('price')?.setValue(value)
//   //console.log(value)
//   })

}
}
