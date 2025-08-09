import { Component, inject, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { globalModules } from '../../globalModules';
import { FormControl, FormGroup, FormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [globalModules, MatDialogActions, MatDialogContent, FormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent implements OnInit {
name:any
username:any
password:any
userSelected:any
user:User = new User();
addUserForm: FormGroup = new FormGroup({
  name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    userType: new FormControl('',Validators.required),
    password: new FormControl('',Validators.min(6)),
  });
 readonly dialogRef = inject(MatDialogRef<AdduserComponent>);
userTypes = [{id:1,name:'client'},{id:2,name:'capturer'}, {id:3,name:'vendor'}]; // Example user types, replace with actual data
nNoClick(): void {
    this.dialogRef.close();
}
ngOnInit(){
  
  //alert(this.data.name)
}

Submit(){

this.user.username = this.user.email
  //alert("hi")
  //alert()
  //console.log(this.product)
  //alert(this.product.name)
  //alert(this.product.vendorId)
  //alert(this.product.price)
  //alert(this.product.stockonHand)
  //alert(this.product.price);
  this.dialogRef.close({user:this.user, userType:this.userSelected});
}

onNoClick(): void {
    this.dialogRef.close();
}
}
