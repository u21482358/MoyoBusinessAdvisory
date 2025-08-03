import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { User } from '../Models/User';
import { globalModules } from '../../globalModules';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createvendor',
  standalone: true,
  imports: [globalModules, MatDialogActions, MatDialogContent, FormsModule],
  templateUrl: './createvendor.component.html',
  styleUrl: './createvendor.component.scss'
})
export class CreatevendorComponent {
name:any
username:any
password:any
user:User = new User();
 readonly dialogRef = inject(MatDialogRef<AddproductComponent>);

nNoClick(): void {
    this.dialogRef.close();
}
ngoninit(){
  //alert(this.data.name)
}

Submit(){
  //alert("hi")
  //alert()
  //console.log(this.product)
  //alert(this.product.name)
  //alert(this.product.vendorId)
  //alert(this.product.price)
  //alert(this.product.stockonHand)
  //alert(this.product.price);
  this.dialogRef.close(this.user);
}

onNoClick(): void {
    this.dialogRef.close();
}
}
