import { Component, inject } from '@angular/core';
import { globalModules } from '../../globalModules';
import { Product } from '../Models/Product';
import { MatDialog } from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [globalModules],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
 //dynamic rendering of mat table
  readonly dialog = inject(MatDialog); // in global Modules?
ELEMENT_DATA: Product[] = [
  {id: 1, name: 'HP Computer', type: 'Computer',vendor:'HP', price: 8000},
  {id: 2, name: 'Dell Computer', type: 'Computer',vendor:'Dell', price: 7000}
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

/**
 * @title Basic use of `<table mat-table>`
 */

// you can maybe add quantity
  displayedColumns: string[] = [ 'name', 'type','vendor', 'price',"button"];
  dataSource = this.ELEMENT_DATA;


   public openDialog(element:any) {
    //console.log(element)
    //alert(element.name)
    const dialogRef = this.dialog.open(PlaceorderComponent, {
      data: element,
    });
}
}
