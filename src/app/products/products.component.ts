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
ELEMENT_DATA: Product[] = [
  {id: 1, name: 'HP Computer', stockonHand: '52',vendorId:'HP', price: 8000},
  {id: 2, name: 'Dell Computer', stockonHand: '60',vendorId:'Dell', price: 7000}
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


  constructor(private productService: ProductserviceService,private userService: UserService) { 
    //productService = {} as ProductService;

  }


/**
 * @title Basic use of `<table mat-table>`
 */

// you can maybe add quantity
  displayedColumns: string[] = [ 'name','vendor', 'price',"button"];
  footerColumn:string[] = ['button']
  dataSource = this.ELEMENT_DATA;


   public openDialog(element:any) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(PlaceorderComponent, {
      data: element,
    });
}
  public EditProduct(element:any) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {product:element,role:this.userRole, command:"edit"},
    });
}
  public AddProduct() {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(AddproductComponent, {
    });
    alert()
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      this.productService.createProduct(result).subscribe({
        next: (data) => {
        }
    })

     // this.GetProducts();
    });
}

  public AddVendort() {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(CreatevendorComponent, {
    });
    alert()
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      this.userService.createVendor(result).subscribe({
        next: (data) => {
        }
    })

     // this.GetProducts();
    });
}

public GetProducts() {
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.dataSource = data
    }})
  }


public ngOnInit(){
  //alert("hi")
  this.GetProducts()
  switch(this.userRole){
    case "capturer":
      this.displayedColumns = ['name', 'type','vendor', 'price',"button"];
      this.btnMessage = "Edit Product";
      break;
      case "manager":
      this.displayedColumns = ['name', 'type','vendor', 'price'];
      this.btnMessage = "Add Product";
      break;
    case "client":
      this.btnMessage = "Place Order";
      break;
      case "vendor":
        this.btnMessage = "Edit Price";
        this.displayedColumns = ['name', 'type','vendor', 'price',"Edit Price","Edit Quantity"];
        break;

}
}
}
