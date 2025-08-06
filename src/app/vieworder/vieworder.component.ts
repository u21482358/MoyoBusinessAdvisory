import { Component, inject } from '@angular/core';
import { globalModules } from '../../globalModules';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { OrderLineViewModel } from '../Models/OrderlineViewModel';
import { Product } from '../Models/Product';
import { OrderViewModel } from '../Models/OrderViewModel';

@Component({
  selector: 'app-vieworder',
  standalone: true,
  imports: [globalModules,MatDialogActions,MatDialogContent,FormsModule],
  templateUrl: './vieworder.component.html',
  styleUrl: './vieworder.component.scss'
})
export class VieworderComponent {
 readonly dialogRef = inject(MatDialogRef<VieworderComponent>);
  readonly data:OrderViewModel = inject<OrderViewModel>(MAT_DIALOG_DATA);
  //subTotal:any = this.data.
  //product?:Product = this.data.product; // should it be readonly?
 // readonly animal = model(this.data.animal);
 //console.log(this.data.orderlines);
 dataSource: any = this.data.orderlines;
total:any = 0;
arr:any = [];
 
displayedColumns: string[] = ['name','vendor','price','quantity','total',"button"];

ngoninit(){
  alert("hi")
  this.data.orderlines?.forEach((orderline:OrderLineViewModel) => {
    //alert(orderline);
    //var num = orderline.product?.price * orderline.quantity
    //this.arr.push(num);
    //this.total = this.total + (orderline.product?.price * orderline.quantity);
  //alert("hi")
  // console.log(this.dataSource);
})
//alert(this.arr)
}
  onNoClick(): void {
    this.dialogRef.close();
}
updatesubTotal(value:any){
  //console.log(this.quantity)
  //alert(value)

   //this.subTotal = this.data.forEach(orderline:) * this.data.price;
  // if(!this.subTotal){
  //   //alert("Please enter a valid quantity");
  //   this.isDisabled = true;
  // }else{
  //   this.isDisabled = false;
  }

  WorkOutLineAmount(price:any, quantity:any): number {
    // This method calculates the total for each order line
     //alert("hi")
    this.total = this.total +  (price * quantity);
    return price * quantity;

  }
  WorkOutTotal(): any {
    // This method calculates the total for the entire order
    //alert("hi")
    //return this.total;
  }
}


