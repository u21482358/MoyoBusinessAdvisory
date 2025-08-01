import { OrderLineViewModel } from './OrderlineViewModel';
import { Product } from './Product';

export class OrderViewModel {

orderID:any // DISPLAY FOR CLIENT
//orderline:any
orderlines?:OrderLineViewModel[] // Assuming products is an array of Product objects
total:any


}