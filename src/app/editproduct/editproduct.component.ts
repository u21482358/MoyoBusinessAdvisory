import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { AbstractControl, FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule,ReactiveFormsModule,CurrencyMaskModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit {





//product:any
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
message:any
readonly dialogRef = inject(MatDialogRef<EditproductComponent>);
readonly data = inject<any>(MAT_DIALOG_DATA);
subTotal:any = this.data.price
product:Product = new Product() // should it be readonly?
userRole:any = this.data.userRole; // should it be readonly?
 // readonly animal = model(this.data.animal);
 vendorproduct:any
 isQuantityEdit:any
  // https://stackoverflow.com/questions/42840136/disable-input-fields-in-reactive-form
addProductForm: FormGroup = new FormGroup({
//  name: new FormControl('',Validators.required),
    //  vendor: new FormControl('',Validators.required),
     price: new FormControl({value:this.data.vendorproduct.price,disabled:this.data.isQuantityEdited},[Validators.required]),
    quantityOnHand: new FormControl({value:this.data.vendorproduct.quantityOnHand,disabled:!(this.data.isQuantityEdited)},[Validators.required, Validators.pattern("^[0-9]*$"),this.quantityValidator]),
  });


 
 onNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
console.log(this.data)
this.vendorproduct = JSON.parse(JSON.stringify(this.data.vendorproduct));
this.isQuantityEdit = this.data.isQuantityEdited;
if(this.isQuantityEdit){
  this.addProductForm.controls[' price'].disable()
}else{
  this.addProductForm.controls[' quantityOnHand'].disable()
}


  //this.product = JSON.parse(JSON.stringify(this.data.product)); // https://stackoverflow.com/questions/51448458/typescript-changes-on-variable-are-being-reflected-on-another-variable

}

quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
 console.log("quantity validate")
    if ( control.value <= 0) {
        return { 'quantity': true }; // this means failed
    }
    return null;
}


  
Submit(){
  // better to put the product so you dont have to run this.
  //this.product.vendor = this.vendors.find((vendor:any) => vendor.id === this.product.vendor.id);
  this.vendorproduct.price = this.addProductForm.get('price')?.value;
   this.vendorproduct.quantityOnHand = this.addProductForm.get('quantityOnHand')?.value;
  console.log(this.product)
  this.dialogRef.close(this.vendorproduct);
}


}

