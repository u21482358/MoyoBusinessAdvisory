import { Component, inject, OnInit } from '@angular/core';
import { globalModules } from '../../globalModules';
import { Product } from '../Models/Product';
import { MatDialog } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';
//import { ProductpopupComponent } from '../editproductold/productpopup.component';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductserviceService } from '../services/productservice.service';
import { CreatevendorComponent } from '../createvendor/createvendor.component';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import e from 'express';
import { AdduserComponent } from '../adduser/adduser.component';
import { OrderService } from '../services/order.service';
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
 userRole:any = "capturer"
 btnMessage:any = "Place Order";
 showFooter: boolean = true; // to show footer row
  readonly dialog = inject(MatDialog); // in global Modules?
  vendors:any = []
  user:User = new User();
// ELEMENT_DATA: Product[] = [
//   {id: 1, name: 'HP Computer',vendor:'HP', stockonHand: '52', price: 8000},
//   {id: 2, name: 'Dell Computer',vendor:'HP', stockonHand: '60', price: 7000}
//   // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


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


   public openDialog(element:User) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(PlaceorderComponent, {
      data: element,
    });
}

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
        }
    })
  }

     // this.GetProducts();
    });
    })
   
}
  public EditProduct(element:any) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {product:element,role:this.userRole, command:"edit", vendors:this.vendors},
    });

     dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      console.log("dialog closed")
      if(result){
      this.productService.updateProduct(result).subscribe({
        next: (data) => {
        }
    })
  }

     // this.GetProducts();
    });
}



  public AddProduct() {
    //console.log(element)
    //alert(element.name)

    alert("remember to add promises to wait for vendors to arrive.")
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
      //alert(result.price)
      alert(result.price)
      if(result){
      this.productService.AssignProductToVendor(result).subscribe({
        next: (data) => {
        }
    })
  }

     // this.GetProducts();
    });

  })

  
    // NB NB NB NB NB get all vendors that are not on product.
    alert("remember to add promises to wait for vendors to arrive.")
    console.log(this.vendors)
   
  
    //alert()
   
}


  public GetVendorProducts() {
    //console.log(element)
    //alert(element.name)
this.userService.GetVendorProducts().subscribe((res:any)=>{
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

  public AddUser() {
    //console.log(element)
    //alert(element.name)
    this.GetVendors()
    const dialogRef = this.dialog.open(AdduserComponent, {
    });
   // alert()
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      //alert(result)
      console.log(result)
      //this.userRole = result.userType
        switch(result.userType){
    case "client":
      this.CreateClient(result);
      break;
    case "vendor":
     this.CreateVendor(result);
      break;
    case "capturer":
      this.CreateCapturer(result);
      //this.user.userType = 'vendor';
      break;
    default:
      //this.user.userType = 'client'; // Default to client if no selection
  }
      if(result){
     
  }

     // this.GetProducts();
    });
}
public CreateVendor(result:any){
   this.userService.createVendor(result.user).subscribe({
        next: (data) => {
          this.userService.getVendors().subscribe({
            next: (data) => {
              this.vendors = data
              //console.log(data);
              //this.dataSource = data;
            }
        })
    }
    })
}
public CreateCapturer(result:any){
   this.userService.createCapturer(result.user).subscribe({
        next: (data) => {
        
    }
    })
  }
  public CreateClient(result:any){
   this.userService.createClient(result.user).subscribe({
        next: (data) => {
        
    }
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
        alert("vendor")
        this.GetVendorProducts()
       

}
}
}
