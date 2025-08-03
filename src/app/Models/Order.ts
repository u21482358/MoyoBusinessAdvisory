import { OrderLine } from "./OrderLine"
import { Product } from "./Product"

export class Order {
id:any
client?:any // for now its optional
orderlines?:OrderLine[] // Assuming orderlines is an array of OrderLine objects
//products?:Product[] // Assuming products is an array of Product objects
status:any
placedOn:any
total:any



}