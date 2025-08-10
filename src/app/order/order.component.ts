import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { Order } from '../Models/Order';
import { OrderViewModel } from '../Models/OrderViewModel';
import { OrderLine } from '../Models/OrderLine';
import { OrderLineViewModel } from '../Models/OrderlineViewModel';
import { VieworderComponent } from '../vieworder/vieworder.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OrderconfirmationComponent } from '../orderconfirmation/orderconfirmation.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [globalModules,DatePipe,MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

    dataSource:any
    activeUserRole:any
      readonly dialog = inject(MatDialog); // in global Modules?
  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested | This orderLineViewModel would return from backend or got from frontend
//     orderLineData:OrderLineViewModel[] = [{product:{id:1, name: 'HP Computer',vendor:'HP', stockonHand: 52, price: 8000}, quantity: 1},
//     {product:{id:2, name: 'Dell Computer',vendor:'HP', stockonHand: 'Computer', price: 7000}, quantity: 2}];
constructor( private orderService: OrderService,private userService: UserService) {
}
// orderData:OrderViewModel[] = [
//     {orderID: 1,total:22000, orderlines: this.orderLineData}, // work out total in the backend
//       {orderID: 2,total:9000, orderlines: [{product:{id:3, name: 'Lenovo Computer',vendor:'HP', stockonHand: 60, price: 9000}, quantity: 1}]}]
displayedColumns: any
order:any
//   dataSource = this.ELEMENT_DATA;


  openDialog(element:any) {
    // This method can be used to open a dialog for order details if needed
  //   var orderviewModel = this.orderData.find(order => order.orderID === element.id);
  // //alert(orderviewModel);
  //   //alert(`Order details for: ${element.name}`);
  //    const dialogRef = this.dialog.open(VieworderComponent, {
  //         data: orderviewModel,
  //       }); // reason why didnt add order to orderViewModel is because it does not need to be displayed in the other view
  //       // the object would be too big for no reason maybe.
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
   // })
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: any) => {
this.activeUserRole = this.userService.activeUserRole;
      switch(this.userService.activeUserRole){
        case "capturer":
          this.displayedColumns = ['date','client','vendor', 'product','status','quantity','price',"total"];
          break;
        case "client":
           this.displayedColumns = ['date', 'product','status','quantity','price',"total"];
          break;
        case "vendor":
           this.displayedColumns = ['date','client', 'product','status','quantity','price',"total","icons"];
          break;
        default:
          //this.btnMessage = "Place Order";
          break;
      }
      console.log(data)
      this.dataSource = data;
  })
  

}

OpenConfirmationDialog(element:any,id:any){
     //console.log(element)
     //alert(element.name)
     let word:any
     if(id == 2){
   word = 'Delivered'
     }else if(id == 1){
 word = 'Pending'
     }
     const dialogRef = this.dialog.open(OrderconfirmationComponent, {
       data: word,
     });
 
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      console.log(result)
      console.log("dialog closed")
      this.order = JSON.parse(JSON.stringify(element))
      this.order.orderStatus.id = id;
      if(result){
      this.orderService.UpdateOrder(this.order).subscribe({
        next: (data:any) => {
           this.orderService.getOrders().subscribe((data: any) => {
                 this.dataSource = data;
           })
          
        }
    })
 }
})

}

CalcTotal(quantity:any,price:any){

return price * quantity;
}
}
