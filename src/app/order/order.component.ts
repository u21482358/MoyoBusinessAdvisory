import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { globalModules } from '../../globalModules';
import { Order } from '../Models/Order';
import { OrderViewModel } from '../Models/OrderViewModel';
import { OrderLine } from '../Models/OrderLine';
import { OrderLineViewModel } from '../Models/OrderlineViewModel';
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
constructor( private orderService: OrderService,private userService: UserService) {
}

displayedColumns: any
order:any



 

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
