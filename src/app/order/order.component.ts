import { Component, inject } from '@angular/core';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { Order } from '../Models/Order';
import { OrderViewModel } from '../Models/OrderViewModel';
import { OrderLine } from '../Models/OrderLine';
import { OrderLineViewModel } from '../Models/OrderlineViewModel';
import { VieworderComponent } from '../vieworder/vieworder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [globalModules],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
ELEMENT_DATA: Order[] = [
    {id: 1, clientId: 101, status: 'Delivered', placedOn: new Date('2023-10-01'), total: 15000},
    {id: 2, clientId: 102, status: 'Pending', placedOn: new Date('2023-10-02'), total: 20000},
    ]
      readonly dialog = inject(MatDialog); // in global Modules?
  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested | This orderLineViewModel would return from backend or got from frontend
    orderLineData:OrderLineViewModel[] = [{product:{id:1, name: 'HP Computer', type: 'Computer',vendor:'HP', price: 8000}, quantity: 1},
    {product:{id:2, name: 'Dell Computer', type: 'Computer',vendor:'Dell', price: 7000}, quantity: 2}];
  
orderData:OrderViewModel[] = [
    {orderID: 1,total:22000, orderlines: this.orderLineData}, // work out total in the backend
      {orderID: 2,total:9000, orderlines: [{product:{id:3, name: 'Lenovo Computer', type: 'Computer',vendor:'Lenovo', price: 9000}, quantity: 1}]}]
displayedColumns: string[] = ['id', 'placedOn','status','total',"button"];
  dataSource = this.ELEMENT_DATA;


  openDialog(element:any) {
    // This method can be used to open a dialog for order details if needed
    var orderviewModel = this.orderData.find(order => order.orderID === element.id);
  //alert(orderviewModel);
    //alert(`Order details for: ${element.name}`);
     const dialogRef = this.dialog.open(VieworderComponent, {
          data: orderviewModel,
        }); // reason why didnt add order to orderViewModel is because it does not need to be displayed in the other view
        // the object would be too big for no reason maybe.
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
    })
  }
}
