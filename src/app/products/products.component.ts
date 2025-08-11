import { Component, inject, OnInit } from '@angular/core';
import { globalModules } from '../../globalModules';
import { Product } from '../Models/Product';
import { MatDialog } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
//import { ProductpopupComponent } from '../editproductold/productpopup.component';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductserviceService } from '../services/productservice.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import e from 'express';
import { AdduserComponent } from '../adduser/adduser.component';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [globalModules,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
 //dynamic rendering of mat table
  private _snackBar = inject(MatSnackBar);
 userRole:any = "capturer"
 btnMessage:any = "Place Order";
 showFooter: boolean = true; // to show footer row
  readonly dialog = inject(MatDialog); // in global Modules?
  vendors:any = []
  user:User = new User();



  constructor(private productService: ProductserviceService,private userService: UserService,private orderService:OrderService) { 
    //productService = {} as ProductService;

  }


/**
 * @title Basic use of `<table mat-table>`
 */

// you can maybe add quantity
  displayedColumns: any// = [ 'name','vendor', 'price',"button"];
  footerColumn:string[] = ['button']
  dataSource:any
  products:any


 

public PlaceOrder(product:any) {
    //console.log(element)
    //alert(element.name)
    // API Call
    this.productService.GetVendorsForProduct(product).subscribe((vendorproducts:any)=>{
      console.log(vendorproducts)
 const dialogRef = this.dialog.open(PlaceorderComponent, {
      data: {product:product,vendorproducts:vendorproducts}
    });

     dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      console.log(result)
      console.log("dialog closed")
      if(result){
      this.orderService.PlaceOrder(result).subscribe({
        next: (data:any) => {
            this._snackBar.open('Order Successfully placed', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
        })
        },error: (err:any) => {
 this._snackBar.open('Error placing order', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
        })
        }
    })
  }

     // this.GetProducts();
    });
    })
   
}



  public EditProduct(element:any,isQuantityEdited: boolean) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {vendorproduct:element, isQuantityEdited:isQuantityEdited},
    });

     dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      console.log("dialog closed")
      if(result){
      this.productService.updateProduct(result).subscribe({
        next: (data) => {
          this.GetProducts()
            this._snackBar.open('Product Successfully Edited', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
        })
        },error: (err:any) => {
  this._snackBar.open('Error Failed to Edit Product', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
        }
    })
  }

     // this.GetProducts();
    });
}

public ngAfterViewInit(): void {
this.userService.vendors.subscribe((res:any)=>{

  this.vendors = res
  console.log(this.vendors);
  //this.dataSource = this.vendors
  console.log(this.products)
})
}



  public AddProduct() {
    //console.log(element)
    //alert(element.name)

   // alert("remember to add promises to wait for vendors to arrive.")
    console.log(this.vendors)
    const dialogRef = this.dialog.open(AddproductComponent, {
      data:{vendors:this.vendors,products:this.products,action:'add'}
    });
    //alert()
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      alert(result.price)
      if(result){
      this.productService.createProduct(result).subscribe({
        next: (data) => {
          this.GetProducts()
            this._snackBar.open('Product Created', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
        })
        },error: (err:any) => {
  this._snackBar.open('Error Failed to Add product', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
        }
    })
  }

     // this.GetProducts();
    });
}




 AssignVendor(product:any) {
    //console.log(element)
    //alert(element.name)
  let val = this.productService.ReturnUnassignedVendorstoproduct(product).subscribe((vendors)=>{
 const dialogRef = this.dialog.open(AddproductComponent, {
      data: {vendors:vendors,product:product,action:'assign'}
    });

     dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      
      if(result){
      this.productService.AssignProductToVendor(result).subscribe({
        next: (data) => {
           this._snackBar.open('Product Assigned to Vendor', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
        })
        },error: (err:any) => {
  this._snackBar.open('Error Failed to Assign Product to Vendor', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
        }
    })
  }

     // this.GetProducts();
    });

  })

  
    // NB NB NB NB NB get all vendors that are not on product.
    
    console.log(this.vendors)
   
  
    //alert()
   
}


  public GetVendorProducts() {
    //console.log(element)
    //alert(element.name)
this.userService.GetVendorProducts().subscribe((res:any)=>{
  console.log(res)
  console.log(res.products)
  this.products = res.products
  this.products.forEach((element:any) => {
    element.vendor = res
  });
  //this.ve
  this.dataSource = this.products
  console.log(this.products)
})
  
  }

  



public GetProducts() {
  this.productService.getProducts().subscribe({
    next: (data:any) => {
     // console.log(data)
     console.log(data)
      this.dataSource = data.products
      this.vendors = data.vendors
    }})
   
  }
  public GetVendors() {
  return this.userService.getVendors().subscribe({
    next: (data:User[]) => {
     // console.log(data)
      this.vendors = data
      console.log(this.vendors);
    }})
     console.log(this.vendors);
  }

  DisplayVendorName(element:any){
console.log(element)
  }


public ngOnInit(){
  //alert("hi")
  this.displayedColumns = ['name','button']
  console.log(this.userService.activeUserRole)
  this.GetProducts()
  this.userRole = this.userService.activeUserRole
  //this.GetVendors()
  console.log(this.userRole)
  switch(this.userRole){
    case "capturer":
      this.GetProducts()
      
      break;
      case "manager":
        this.GetProducts()
      
      break;
    case "client":
      this.GetProducts()
      this.btnMessage = "Place Order";
      break;
      case "vendor":
        //alert("vendor")
        this.GetVendorProducts()
       

}
}
}
