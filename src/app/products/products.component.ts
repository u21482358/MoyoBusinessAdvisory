import { Component } from '@angular/core';
import { globalModules } from '../../globalModules';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [globalModules],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
// dynamic rendering of mat table

ELEMENT_DATA: any = [
  {position: 1, name: 'HP Computer', type: 'Computer', price: 8000},
  {position: 2, name: 'Dell Computer', type: 'Computer', price: 8000}
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


  displayedColumns: string[] = [ 'name', 'type', 'price'];
  dataSource = this.ELEMENT_DATA;

}
